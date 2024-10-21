import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import _ from 'lodash';

import $ from '../util/exception.helper';
import { Donation } from './donation.entity';
import { User } from '../user/user.entity';
import { PaginatedRequest, PaginatedResponse } from '../util/page';
import { applySearchQueries, dateRangeFilter } from '../util/filters';
import { CreateDonationDTO } from './dto/create-donation.dto';
import { UpdateDonationDTO } from './dto/update-donation.dto';
import { CacheService } from '../util/cache.service';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private readonly donationsRepository: Repository<Donation>,
    private readonly cacheService: CacheService
  ) {}

  // todo: add other needed functions and operation inside crud

  async createDonations(_user: User, createDonationDto: CreateDonationDTO) {
    return await this.donationsRepository.manager.transaction(
      async (manager) => {
        return await manager.save(Donation, {
          ..._.omitBy(createDonationDto, _.isUndefined),
        });
      }
    );
  }

  private getBasicQueryBuilder(
    _user: User,
    _queryLevel = 0
  ): SelectQueryBuilder<Donation> {
    const qb = this.donationsRepository.createQueryBuilder('donations');

    return qb;
  }

  async findDonation(user: User | null, id: string, queryLevel = 0) {
    const key = this.cacheService.createKey('findDonation', id, queryLevel);
    const cachedDonation = await this.cacheService.get<Donation>(key);

    if (!cachedDonation) {
      const foundDonation = await this.findOne(user, id, queryLevel);
      await this.cacheService.set(key, foundDonation, 600 * 1000);
      return foundDonation;
    }

    return cachedDonation;
  }

  async donationsFeed(
    user: User | null,
    pageRequest: PaginatedRequest,
    queryLevel = 0
  ): Promise<PaginatedResponse<Donation>> {
    const qb = this.getBasicQueryBuilder(user, queryLevel);
    qb.skip(pageRequest.pagination.skip)
      .take(pageRequest.pagination.take)
      .orderBy('donations.createdAt', 'DESC');

    if (pageRequest.query)
      applySearchQueries(qb, 'donations', ['names'], pageRequest.query);

    if (pageRequest.type)
      qb.andWhere('donations.type = :type', { type: pageRequest.type });

    if (pageRequest.year)
      qb.andWhere('donations.year = :year', { year: pageRequest.year });

    if (pageRequest.filters)
      this.applyDonationsFilters(user, qb, pageRequest.filters);

    this.sortDonationsFeed(user, qb, pageRequest);

    const [list, total] = await qb.getManyAndCount();
    return new PaginatedResponse(list, total, pageRequest);
  }

  async updateDonation(
    user: User,
    updateDonationDTO: UpdateDonationDTO,
    queryLevel = 0
  ) {
    return await this.donationsRepository.manager.transaction(
      async (manager) => {
        const key = this.cacheService.createKey(
          'findDonation',
          updateDonationDTO.id,
          queryLevel
        );
        await this.cacheService.removeKey(key);

        const updatedDonation = await manager.update(
          Donation,
          { id: updateDonationDTO.id },
          {
            ..._.omitBy(updateDonationDTO, _.isUndefined),
          }
        );

        return updateDonationDTO;
      }
    );
  }

  async removeDonation(user: User, id: string, queryLevel = 0) {
    const donation = await this.findOne(user, id, queryLevel);

    try {
      return await this.donationsRepository.manager.transaction(
        async (manager) => {
          const key = this.cacheService.createKey(
            'findDonation',
            id,
            queryLevel
          );
          await this.cacheService.removeKey(key);

          await manager.remove(Donation, donation);
          return true;
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private async findOne(user: User | null, id: string, queryLevel = 0) {
    const qb = this.getBasicQueryBuilder(user, queryLevel).where(
      'donations.id = :id',
      { id }
    );
    const foundDonation = await qb.getOne();
    $.requiredEntity(foundDonation);

    return foundDonation;
  }

  private applyDonationsFilters(
    _user: User,
    qb: SelectQueryBuilder<Donation>,
    filters: any
  ) {
    if (!filters) return;

    const requestedCreateRange = filters.createdAt;
    if (requestedCreateRange)
      dateRangeFilter(qb, requestedCreateRange, 'createdAt', 'donations');
  }

  private sortDonationsFeed(
    _user: User | null,
    qb: SelectQueryBuilder<Donation>,
    pageRequest: PaginatedRequest
  ) {
    const { sortBy, sortType } = pageRequest;

    const sortFields = {
      byId: 'donations.id',
      mostRecent: 'donations.createdAt',
      mostRecentlyUpdated: 'donations.updatedAt',
    };
    qb.orderBy(sortFields[sortBy], sortType === 'ASC' ? 'ASC' : 'DESC');
  }
}
