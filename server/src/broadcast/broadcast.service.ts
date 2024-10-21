import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';

import $ from '../util/exception.helper';
import { WorkSupport } from './broadcast.entity';
import { User } from '../user/user.entity';
import { CacheService } from '../util/cache.service';
import { PaginatedRequest, PaginatedResponse } from '../util/page';
import {
  applySearchQueries,
  applySorting,
  dateRangeFilter,
  EntityKeys,
} from '../util/filters';
import { InjectRepository } from '@nestjs/typeorm';
import { toNumber } from 'lodash';

@Injectable()
export class BroadcastService {
  constructor(
    @InjectRepository(WorkSupport)
    private readonly broadcastRepository: Repository<WorkSupport>,
    private readonly cacheService: CacheService
  ) {}

  async findBroadcast(user: User | null, id: string, queryLevel = 1) {
    const key = this.cacheService.createKey('findBroadcast', id, queryLevel);
    const cachedBroadcast = await this.cacheService.get<WorkSupport>(key);

    if (!cachedBroadcast) {
      const broadcast = await this.findOne(user, id, queryLevel);
      await this.cacheService.set(key, broadcast, 600 * 1000);
      return broadcast;
    }

    return cachedBroadcast;
  }

  async broadcastFeed(
    user: User,
    pageRequest: PaginatedRequest,
    queryLevel = 1
  ) {
    const qb = this.getBasicQueryBuilder(user, queryLevel)
      .skip(pageRequest.pagination.skip)
      .take(pageRequest.pagination.take)
      .orderBy('broadcast.createdAt', 'DESC');

    if (pageRequest.query) {
      if (pageRequest.searchBy)
        applySearchQueries(
          qb,
          'broadcast',
          [pageRequest.searchBy] as EntityKeys<WorkSupport>[],
          pageRequest.query
        );
      else
        applySearchQueries(
          qb,
          'broadcast',
          ['title', 'genre'],
          pageRequest.query
        );
    }
    if (pageRequest.type)
      qb.andWhere('broadcast.type = :type', {
        type: toNumber(pageRequest.type),
      });

    if (pageRequest.filters)
      this.applyBroadcastFilters(user, qb, pageRequest.filters);

    // applySorting(qb, 'broadcast', pageRequest);
    qb.orderBy(`awards`, 'ASC');
    qb.addOrderBy(
      "FIELD(broadcast, '대상', '최우수상', '우수상', '제작상', '기획상', '특별상', '제작지원작', '장려상' )",
      'ASC'
    );

    const [list, total] = await qb.getManyAndCount();
    return new PaginatedResponse(list, total, pageRequest);
  }

  private async findOne(
    user: User,
    id: string,
    queryLevel = 1
  ): Promise<WorkSupport> {
    const qb = this.getBasicQueryBuilder(user, queryLevel);

    qb.andWhere('broadcast.id = :id', { id });

    const foundBroadcast = await qb.getOne();

    $.requiredEntity(foundBroadcast);

    return foundBroadcast;
  }

  private applyBroadcastFilters(
    user: User,
    qb: SelectQueryBuilder<WorkSupport>,
    filters: any
  ) {
    if (!filters) return;

    const requestedTheaterRange = filters.theatersDate;
    if (requestedTheaterRange)
      dateRangeFilter(qb, requestedTheaterRange, 'theatersDate', 'broadcast');

    const createdAtRange = filters.createdAt;
    if (createdAtRange)
      dateRangeFilter(qb, createdAtRange, 'createdAt', 'broadcast');

    const updatedAtRange = filters.updatedAt;
    if (updatedAtRange)
      dateRangeFilter(qb, updatedAtRange, 'updatedAt', 'broadcast');
  }

  private getBasicQueryBuilder(
    _user: User,
    _queryLevel = 0
  ): SelectQueryBuilder<WorkSupport> {
    const qb = this.broadcastRepository.createQueryBuilder('broadcast');

    // if (queryLevel > 0) {
    // }

    return qb;
  }
}
