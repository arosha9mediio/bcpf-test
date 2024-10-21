import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import _ from 'lodash';

import $ from '../util/exception.helper';
import { Contest, ContestStatus } from './contests.entity';
import { User } from '../user/user.entity';
import { CreateContestDTO } from './dto/createContestDto';
import { PaginatedRequest, PaginatedResponse } from '../util/page';
import {
  applySearchQueries,
  applySorting,
  dateRangeFilter,
} from '../util/filters';
import { UpdateContestDTO } from './dto/updateContestDto';
import { CacheService } from '../util/cache.service';
import moment from 'moment';

@Injectable()
export class ContestsService {
  constructor(
    @InjectRepository(Contest)
    private readonly contestRepository: Repository<Contest>,
    private readonly cacheService: CacheService
  ) {}

  async createContest(user: User, createContestDto: CreateContestDTO) {
    return await this.contestRepository.manager.transaction(async (manager) => {
      return await manager.save(Contest, {
        ..._.omitBy(createContestDto, _.isUndefined),
        userId: Number(user.id),
      });
    });
  }

  private getBasicQueryBuilder(
    user: User | null,
    queryLevel = 1
  ): SelectQueryBuilder<Contest> {
    const qb = this.contestRepository.createQueryBuilder('contests');

    if (queryLevel > 0) {
      if (user?.isAdmin || user?.isManager) {
        qb.leftJoinAndSelect('contests.Application', 'Application');
      } else if (user?.isUser) {
        qb.leftJoinAndSelect(
          'contests.Application',
          'Application',
          'Application.userId = :userId',
          { userId: user.id }
        );
        // .andWhere('Application.id IS NOT NULL');
      }
    }
    if (user?.isAdmin || user?.isManager) {
    } else
      qb.andWhere('contests.startDate <= :now AND contests.endDate >= :now', {
        // get
        now: moment().format('YYYY-MM-DD HH:mm:ss'),
      });

    return qb;
  }

  async findContest(user: User | null, id: string, queryLevel = 1) {
    const foundContest = await this.findOne(user, id, queryLevel);
    return foundContest;
  }

  async contestsFeed(
    user: User | null,
    pageRequest: PaginatedRequest,
    queryLevel = 1
  ): Promise<PaginatedResponse<Contest>> {
    const qb = this.getBasicQueryBuilder(user, queryLevel);
    qb.skip(pageRequest.pagination.skip)
      .take(pageRequest.pagination.take)
      .orderBy('contests.id', 'DESC');

    // todo: filter for teacher/manager

    // ! do we need this?

    if (pageRequest.searchBy)
      qb.andWhere('contests.statusId = :sId', { sId: pageRequest.searchBy });

    if (pageRequest.type)
      qb.andWhere('contests.contestType = :type', { type: pageRequest.type });

    if (pageRequest.viewMain && ['아니요', '예'].includes(pageRequest.viewMain))
      qb.andWhere('contests.viewMain = :vm', { vm: pageRequest.viewMain });

    if (pageRequest.query)
      applySearchQueries(qb, 'contests', ['title'], pageRequest.query);

    if (pageRequest.filters)
      this.applyContestsFilters(user, qb, pageRequest.filters);

    // if (pageRequest.from && pageRequest.to) {
    //   const from = fDateTime(pageRequest.from.toISOString());
    //   const to = fDateTime(pageRequest.to.toISOString());
    //   qb.andWhere(
    //     new Brackets((qb) => {
    //       qb.where('contests.startDate BETWEEN :from AND :to', {
    //         from,
    //         to,
    //       })
    //         .orWhere('contests.endDate BETWEEN :from AND :to', { from, to })
    //         .orWhere(
    //           'contests.startDate >= :from AND contests.endDate <= :to',
    //           { from, to }
    //         );
    //     })
    //   );
    // }

    applySorting(qb, 'contests', pageRequest);

    const [list, total] = await qb.getManyAndCount();
    return new PaginatedResponse(list, total, pageRequest);
  }

  async updateContest(
    user: User,
    updateContestDTO: UpdateContestDTO,
    queryLevel = 0
  ) {
    await this.findOne(user, updateContestDTO.id, queryLevel);

    // checkCanHandle(user, foundContest.userId.toString());

    return await this.contestRepository.manager.transaction(async (manager) => {
      await this.cleanContestCache(updateContestDTO.id);
      await manager.update(
        Contest,
        {
          id: updateContestDTO.id,
        },
        {
          ..._.omitBy(updateContestDTO, _.isUndefined),
        }
      );

      const updatedContest = await this.findOne(
        user,
        updateContestDTO.id,
        queryLevel
      );

      const key = this.cacheService.createKey(
        'findContest',
        updateContestDTO.id,
        queryLevel
      );
      await this.cacheService.set(key, updatedContest, 300 * 1000);

      return updatedContest;
    });
  }

  async removeContest(user: User, id: string, queryLevel = 0) {
    const contest = await this.findOne(user, id, queryLevel);

    // checkCanHandle(user, contest.userId.toString());

    try {
      return await this.contestRepository.manager.transaction(
        async (manager) => {
          await this.cleanContestCache(id);
          await manager.remove(Contest, contest);

          return true;
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getMainContests(queryLevel = 0) {
    const qb = this.contestRepository.createQueryBuilder('contests');

    qb.andWhere('contests.viewMain = :vm', { vm: '예' })
      .orderBy('contests.id', 'DESC')
      .limit(4);

    const res = await qb.getMany();

    return res;
  }

  private async findOne(user: User | null, id: string, queryLevel = 0) {
    const qb = this.getBasicQueryBuilder(user, queryLevel).andWhere(
      'contests.id = :id',
      { id }
    );

    // if (user.isUser) {
    //   qb.andWhere('contests.statusId != :status', {
    //     status: ContestStatus.STATUS_END,
    //   });
    // }

    if (user.isUser) {
      qb.andWhere('contests.statusId IN (:...statuses)', {
        statuses: [
          //    ContestStatus.STATUS_END,
          ContestStatus.STATUS_APPLY_ING,
        ],
      });
    }

    const foundContest = await qb.getOne();

    $.requiredEntity(foundContest, '공모전 정보가 없거나 종료되었습니다.');

    return foundContest;
  }

  private applyContestsFilters(
    user: User,
    qb: SelectQueryBuilder<Contest>,
    filters: any
  ) {
    if (!filters) return;

    const requestedCreateRange = filters.createdAt;
    if (requestedCreateRange)
      dateRangeFilter(qb, requestedCreateRange, 'createdAt', 'contests');
  }

  // private async updateViewsCount(
  //   manager: EntityManager,
  //   id: string,
  //   updateType: 'increment' | 'decrement' = 'increment'
  // ) {
  //   try {
  //     let result: UpdateResult;
  //     if (updateType === 'increment')
  //       result = await manager.increment(Contest, { id }, 'views', 1);
  //     else result = await manager.decrement(Contest, { id }, 'views', 1);

  //     return result.affected > 0;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }

  private async cleanContestCache(id: string) {
    const key1 = this.cacheService.createKey('findContest', id, 0);
    const key2 = this.cacheService.createKey('findContest', id, 1);
    await this.cacheService.removeKeys([key1, key2]);
  }
}
