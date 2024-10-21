import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import _ from 'lodash';
import { unserialize } from 'php-serialize';

import $ from '../util/exception.helper';
import { ContestApply } from './application.entity';
import { User } from '../user/user.entity';
import { CreateApplicantDTO } from './dto/createApplicantDto';
import {
  applySearchQueries,
  applySorting,
  dateRangeFilter,
  EntityKeys,
} from '../util/filters';
import { PaginatedRequest, PaginatedResponse } from '../util/page';
import { ContestsService } from '../contests/contests.service';
import { ContestStatus } from 'src/contests/contests.entity';
import { UpdateApplicationDTO } from './dto/updateApplicationDto';
import { checkCanHandle, checkIsOwner } from '../util/auth';
import { CacheService } from '../util/cache.service';
import { FileType } from '../util/objectTypes/embedFileType';

// ! what fields need to add?

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ContestApply)
    private readonly contestApplyRepository: Repository<ContestApply>,
    private readonly contestService: ContestsService,
    private readonly cacheService: CacheService
  ) {}

  async createContestApplication(
    user: User,
    createApplicantDTO: CreateApplicantDTO,
    queryLevel = 0
  ) {
    const { prefix, ...restOfTheDTO } = createApplicantDTO;
    const saveContestApplication = async (
      manager: EntityManager,
      userId: string
    ) => {
      try {
        const createdRecord = await manager.save(ContestApply, {
          ..._.omitBy(restOfTheDTO, _.isUndefined),
          userId: Number(userId),
          passStatus: '접수처리중',
          applyNumber: 'INITIAL-VALUE',
        });

        const createdId = createdRecord.id;
        const newApplyNumber = `${prefix}-${createdId}`;

        const files = createdRecord.file.map((file) => {
          const splittedArray = file.filename.split('.');
          const extention = splittedArray[splittedArray.length - 1];

          const applierName =
            createdRecord.applier1Name.split(' ')[0] ||
            createdRecord.applier1Name;

          return {
            ...file,
            filename: `${newApplyNumber}-${applierName}.${extention}`,
          };
        });

        await manager.update(
          ContestApply,
          { id: createdId },
          { applyNumber: newApplyNumber, file: files }
        );

        return await manager.findOne(ContestApply, {
          where: { id: createdId },
        });
      } catch (error) {
        // console.log(error);
        throw error;
      }
    };

    if (user.isAdmin) {
      return await this.contestApplyRepository.manager.transaction(
        async (manager) => {
          return saveContestApplication(
            manager,
            createApplicantDTO.userId.toString()
          );
        }
      );
    } else {
      const [isExist, isActiveContest] = await Promise.all([
        this.isAlreadyApplied(
          user,
          createApplicantDTO.contestId,
          createApplicantDTO.contestType
        ),
        this.checkIfContestActive(user, createApplicantDTO.contestId),
      ]);

      if (!isExist && isActiveContest) {
        return await this.contestApplyRepository.manager.transaction(
          async (manager) => {
            return saveContestApplication(manager, user.id);
          }
        );
      } else
        throw new BadRequestException(
          'user has already applied or the contest is not active'
        );
    }
  }

  private getBasicQueryBuilder(
    user: User | null,
    queryLevel = 1
  ): SelectQueryBuilder<ContestApply> {
    const qb = this.contestApplyRepository.createQueryBuilder('apply');

    if (queryLevel) {
      qb.innerJoinAndSelect('apply.Contest', 'Contest');
    }

    return qb;
  }

  async applicationsFeed(
    user: User | null,
    pageRequest: PaginatedRequest,
    queryLevel = 1
  ): Promise<PaginatedResponse<ContestApply>> {
    const qb = this.getBasicQueryBuilder(user, queryLevel);

    qb.skip(pageRequest.pagination.skip).take(pageRequest.pagination.take);

    this.commonApplicationFeed(user, qb, pageRequest);

    const [list, total] = await qb.getManyAndCount();
    return new PaginatedResponse(list, total, pageRequest);
  }

  private async findOne(user: User, id: string, queryLevel = 1) {
    const qb = this.getBasicQueryBuilder(user, queryLevel).where(
      'apply.id = :id',
      { id }
    );

    const foundApplication = await qb.getOne();

    $.requiredEntity(foundApplication, '지원서 정보가 존재하지 않습니다.');

    if (user.isManager && foundApplication.Contest.contestType !== 'mcn')
      throw new UnauthorizedException();

    return foundApplication;
  }

  async findApplication(user: User, id: string, queryLevel = 1) {
    // const key = this.cacheService.createKey('findApplication', id, queryLevel);
    // const cachedApplication = await this.cacheService.get<ContestApply>(key);

    // if (user.isUser) checkIsOwner(user, cachedApplication.userId.toString());

    // if (!cachedApplication) {
    const application = await this.findOne(user, id, queryLevel);
    // await this.cacheService.set(key, application, 600 * 1000);

    if (user.isUser) checkIsOwner(user, application.userId.toString());
    return application;
    // }

    // return cachedApplication;
  }

  async updateApplication(
    user: User,
    updateApplicationDTO: UpdateApplicationDTO,
    queryLevel = 1
  ) {
    const application = await this.findOne(user, updateApplicationDTO.id);

    checkCanHandle(user, application.userId.toString());

    const contest = await this.contestService.findContest(
      user,
      application.contestId.toString()
    );

    if (!user.isAdmin) await this.checkIfContestActive(user, contest.id);

    return this.contestApplyRepository.manager.transaction(async (manager) => {
      const key = this.cacheService.createKey(
        'findApplication',
        updateApplicationDTO.id,
        queryLevel
      );
      await this.cleanContestApplyCache(updateApplicationDTO.id);
      await manager.update(
        ContestApply,
        {
          id: updateApplicationDTO.id,
        },
        {
          ..._.omitBy(updateApplicationDTO, _.isUndefined),
        }
      );

      const updatedApplication = await this.findOne(
        user,
        updateApplicationDTO.id,
        queryLevel
      );

      await this.cacheService.set(key, updatedApplication, 300 * 1000);

      return updatedApplication;
    });
  }

  async removeApplication(user: User, id: string, queryLevel = 0) {
    const application = await this.findOne(user, id, queryLevel);

    checkCanHandle(user, application.userId.toString());

    try {
      return await this.contestApplyRepository.manager.transaction(
        async (manager) => {
          await this.cleanContestApplyCache(id);
          await manager.remove(ContestApply, application);

          return true;
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private applyContestApplyFilters(
    user: User,
    qb: SelectQueryBuilder<ContestApply>,
    filters: any
  ) {
    if (!filters) return;

    const requestedCreateRange = filters.createdAt;
    if (requestedCreateRange)
      dateRangeFilter(qb, requestedCreateRange, 'createdAt', 'apply');
  }

  private commonApplicationFeed(
    user: User,
    qb: SelectQueryBuilder<ContestApply>,
    pageRequest: PaginatedRequest
  ) {
    qb.orderBy('apply.id', 'DESC');

    // TODO #202 : @strider-z @JongKwanPark What this is?
    // we need to 3 cases retreiving application to user for each role
    // for admin , we allow all application.
    // for manager(teacher) we alollow mcn only - good
    // for user, we allow own application.
    if (user.isUser) qb.where('apply.userId = :userId', { userId: user.id });

    if (user?.isManager)
      qb.andWhere('Contest.contestType = :ctype', { ctype: 'mcn' });

    if (pageRequest.contestId)
      qb.andWhere('apply.contestId = :contestId', {
        contestId: pageRequest.contestId,
      });

    if (pageRequest.searchBy && pageRequest.query) {
      if (pageRequest.client)
        applySearchQueries(
          qb,
          'apply',
          [pageRequest.searchBy] as EntityKeys<ContestApply>[],
          pageRequest.query
        );
      else
        qb.andWhere('apply.passStatus = :pId', { pId: pageRequest.searchBy });
    }

    if (pageRequest.type)
      qb.andWhere('apply.contestType = :type', { type: pageRequest.type });

    if (pageRequest.query)
      applySearchQueries(
        qb,
        'apply',
        ['contestType', 'applier1Name'],
        pageRequest.query
      );

    if (pageRequest.filters)
      this.applyContestApplyFilters(user, qb, pageRequest.filters);

    applySorting(qb, 'apply', pageRequest);
  }

  async prepareDataForExcel(user: User, pageRequest: PaginatedRequest) {
    // const user = new User();
    // user.role = User.RoleEnum.Admin;

    const qb = this.getBasicQueryBuilder(user);

    this.commonApplicationFeed(user, qb, pageRequest);

    return await qb.getMany();
  }

  async getApplicationByContest(user: User, contestId: string, queryLevel = 1) {
    const qb = this.getBasicQueryBuilder(user, queryLevel);

    qb.where('apply.contestId = :contestId', { contestId }).andWhere(
      'apply.userId = :userId',
      { userId: user.id }
    );

    const application = await qb.getOne();

    if (!application) return null;

    return application;
  }

  // ! pending requirements
  async getFileLinks(
    user: User,
    pageRequest: PaginatedRequest,
    queryLevel = 1
  ) {
    const qb = this.getBasicQueryBuilder(user, queryLevel);

    qb.select([
      'apply.id',
      'apply.contestId',
      'apply.userId',
      'apply.applier1Name',
      'apply.applyNumber',
      'apply.file',
      'Contest.title',
    ]);

    this.commonApplicationFeed(user, qb, pageRequest);

    const list = await qb.getMany();

    const filteredDocs = list.map((item) => {
      if (item.file?.length > 0) {
        item.file = item.file.filter(
          (fileItem) => fileItem.type === FileType.DOC
        );
      }
      return item;
    });

    return filteredDocs;
  }

  /**
   * returns true if user has reached the limit of the application for certain contest
   * @param user
   * @param contestId id of the contest
   * @param contestType type of the contest
   * @returns
   */
  private async isAlreadyApplied(
    user: User,
    contestId: number,
    contestType: string
  ): Promise<boolean> {
    try {
      const count = await this.contestApplyRepository.count({
        where: { userId: Number(user.id), contestId },
      });

      const hasLimitReached = (() => {
        switch (contestType) {
          case 'drama':
            return count >= 3;
          default:
            return count >= 1;
        }
      })();

      return hasLimitReached;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async checkIfContestActive(user: User, contestId: number) {
    const contest = await this.contestService.findContest(
      user,
      contestId.toString(),
      0
    );

    const now = new Date();
    const startDate = new Date(contest.startDate);
    const endDate = new Date(contest.endDate);

    if (
      now < startDate ||
      now > endDate ||
      contest.statusId !== ContestStatus.STATUS_APPLY_ING
    ) {
      throw new BadRequestException('지금은 지원기간이 아닙니다.');
    }

    return true;
  }
  // ! or should just check the status -> ongoing

  async getApplicantFiles(
    user: User | null,
    applicationId: string,
    queryLevel = 0
  ) {
    const application = await this.findApplication(user, applicationId);

    // console.log(application);

    if (!(user?.isAdmin || user?.isManager))
      checkIsOwner(user, application.userId.toString());

    const file = application.file.filter((f) => f.type === FileType.DOC)[0];

    if (!file) return null;

    return {
      filename: file.filename,
      url: `${file.url}`,
      // url: `${file.url}${file.filename}`,
      key: file.key,
    };
  }

  private async cleanContestApplyCache(id: string) {
    const key1 = this.cacheService.createKey('findApplication', id, 0);
    const key2 = this.cacheService.createKey('findApplication', id, 1);
    await this.cacheService.removeKeys([key1, key2]);
  }
}
