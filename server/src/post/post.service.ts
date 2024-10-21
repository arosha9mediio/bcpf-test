import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Brackets,
  EntityManager,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import _ from 'lodash';

import { Post, PostType, ttl } from './entites/post.entity';
import { User } from '../user/user.entity';
import $ from '../util/exception.helper';
import { CreatePostDTO } from './dto/createPost.dto';
import { UpdatePostDTO } from './dto/updatePost.dto';
import { PaginatedRequest, PaginatedResponse } from '../util/page';
import { checkCurrentUserCanHandle, checkIsOwner } from '../util/auth';
import {
  applySearchQueries,
  applySorting,
  dateRangeFilter,
  EntityKeys,
} from '../util/filters';
import { CacheService } from '../util/cache.service';
import { fDateTime } from 'src/util/datetime';
import { AdjacentResponse } from './objects/adjacent.object';
import { FileType } from 'src/util/objectTypes/embedFileType';
import moment from 'moment';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly logger: Logger,
    private readonly cacheService: CacheService
  ) {}

  // todo: find a solution for hardcoded catIds
  // todo: private fields to hide??

  async createPost(user: User, createPostDto: CreatePostDTO) {
    let newPost: Post;

    await this.postRepository.manager.transaction(async (manager) => {
      newPost = await manager.save(Post, {
        ..._.omitBy(createPostDto, _.isUndefined),
        createdBy: user.id,
      });

      if (createPostDto.type === (PostType.comment || PostType.reply)) {
        const masterPost = await this.findOne(createPostDto.topicId, user);
        await this.updateTypeCount(manager, masterPost.id, 'commentCount');
      }
      if (createPostDto.categoryId === '9') {
        const masterPost = await this.findOne(createPostDto.topicId, user);
        await this.updateTypeCount(manager, masterPost.id, 'reportCount');
      }
    });

    return newPost;
  }

  private getBasicQueryBuilder(
    user: User,
    queryLevel = 1
  ): SelectQueryBuilder<Post> {
    const qb = this.postRepository.createQueryBuilder('post');

    if (queryLevel > 0) {
      qb.innerJoinAndSelect('post.Category', 'Category')
        .innerJoinAndSelect('post.User', 'User')
        .leftJoinAndSelect('User.UserProfile', 'UserProfile');
      // .leftJoinAndSelect('post.SubPosts', 'SubPosts')
      // .leftJoinAndSelect('SubPosts.User', 'SubPostUser');
      // .leftJoinAndSelect('post.Contest', 'Contest');
    }

    // todo : if  user.role

    return qb;
  }

  async postFeed(
    user: User | null,
    pageRequest: PaginatedRequest,
    queryLevel = 1
  ): Promise<PaginatedResponse<Post>> {
    $.requiredEntity(pageRequest.categoryId);

    const qb = this.getBasicQueryBuilder(user, queryLevel);
    qb.skip(pageRequest.pagination.skip)
      .take(pageRequest.pagination.take)
      .where('post.categoryId = :cid', {
        cid: pageRequest.categoryId,
      })
      .orderBy('post.id', 'DESC');

    if (pageRequest.type) {
      qb.andWhere('post.type = :type', {
        type: pageRequest.type,
      });
    }

    if (
      // !(user?.isAdmin || user?.isManager) &&
      pageRequest.client &&
      pageRequest.categoryId === 1 &&
      pageRequest?.sortBy != 'pin'
    ) {
      qb.andWhere('post.pin = :pin', { pin: 0 });
    }

    if (
      (!(user?.isAdmin || user?.isManager) ||
        (pageRequest.client ?? pageRequest.client)) &&
      ![14].includes(pageRequest.categoryId)
    ) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where(
            'post.publishStatus IS NULL AND post.publishedAt <= :now AND post.unpublishedAt >= :now',
            {
              now: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
          ).orWhere('post.publishStatus = :ps', { ps: true });
        })
      );
    }

    if (pageRequest.from && pageRequest.to) {
      const from = fDateTime(pageRequest.from.toISOString());
      const to = fDateTime(pageRequest.to.toISOString());

      if (pageRequest.categoryId === 1) {
        qb.andWhere(
          new Brackets((qb) => {
            qb.where('post.createdAt BETWEEN :from AND :to', { from, to });
          })
        );
      } else {
        qb.andWhere(
          new Brackets((qb) => {
            qb.where('post.publishedAt BETWEEN :from AND :to', { from, to })
              .orWhere('post.unpublishedAt BETWEEN :from AND :to', { from, to })
              .orWhere(
                'post.publishedAt >= :from AND post.unpublishedAt <= :to',
                {
                  from,
                  to,
                }
              );
          })
        );
      }
    }

    if (pageRequest.query) {
      // todo: filter by notice type? draft | normal ????

      if (pageRequest.searchBy)
        applySearchQueries(
          qb,
          'post',
          [pageRequest.searchBy] as EntityKeys<Post>[],
          pageRequest.query
        );
      else applySearchQueries(qb, 'post', ['title', 'body'], pageRequest.query);
    }

    if (pageRequest.filters) this.applyPostsFilters(qb, pageRequest.filters);

    this.sortPostFeed(user, qb, pageRequest);

    const [list, total] = await qb.getManyAndCount();
    return new PaginatedResponse(list, total, pageRequest);
  }

  async findPost(user: User | null, id: string, queryLevel = 1): Promise<Post> {
    console.log('findPost');
    const key = this.cacheService.createKey('findPost', id, queryLevel);
    const cachedPost = await this.cacheService.get<Post>(key);

    let returnPost = null;

    if (!cachedPost || (user && user.isAdmin)) {
      Logger.error('user is admin so data returns.');
      const foundPost = await this.findOne(id, user);
      await this.cacheService.set<Post>(key, foundPost, ttl);

      returnPost = foundPost;
    } else {
      Logger.error('cache returns.');
      const updatedCache = { ...cachedPost, views: cachedPost.views++ };
      await this.cacheService.set<Post>(key, updatedCache, 300 + 1000);

      returnPost = cachedPost;
    }

    this.postRepository.manager.transaction(async (manager) => {
      this.updateTypeCount(manager, returnPost.id, 'views');
    });

    return returnPost;
  }

  async updatePost(user: User, updatePostDto: UpdatePostDTO): Promise<Post> {
    const foundPost = await this.findOne(updatePostDto.id, user);

    // ! do we need this???
    checkCurrentUserCanHandle(user, foundPost.createdBy);

    await this.postRepository.manager.transaction(async (manager) => {
      await this.cleanPostCache(updatePostDto.id);
      await manager.update(
        Post,
        {
          id: updatePostDto.id,
        },
        {
          ..._.omitBy(updatePostDto, _.isUndefined),
        }
      );
    });
    const updatedPost = await this.findOne(updatePostDto.id, user);

    const key = this.cacheService.createKey('findPost', updatePostDto.id, 1);
    await this.cacheService.set(key, updatedPost, ttl);

    return updatedPost;
  }

  async deletePost(user: User, id: string): Promise<boolean> {
    const foundPost = await this.findOne(id, user);

    checkCurrentUserCanHandle(user, foundPost.createdBy);

    await this.postRepository.manager.transaction(async (manager) => {
      await this.cleanPostCache(id);
      await this.postRepository.remove(foundPost);
      if (foundPost.type === PostType.reply)
        await this.updateTypeCount(
          manager,
          foundPost.topicId,
          'commentCount',
          'decrement'
        );
      if (foundPost.categoryId === '9')
        await this.updateTypeCount(
          manager,
          foundPost.topicId,
          'reportCount',
          'decrement'
        );
    });

    return true;
  }

  async getArticleLink(user: User | null, id: string, queryLevel = 0) {
    const post = await this.findOne(id, user, queryLevel);

    // TODO #199 : @JongKwanPark Need to check auth and think about if we can use findOne instead of this.
    // if (!(user.isAdmin || user.isManager)) checkIsOwner(user, post.createdBy);
    // if (![1, 2].includes(Number(post.categoryId)))
    //   throw new UnauthorizedException();

    const files = post.file;

    if (!files) return null;

    return files?.filter((file) => file.type === FileType.DOC)[0]; // only one doc or??
  }

  /**
   * use to increment commentCount | reportCount | views
   * @param manager Entity manager
   * @param id postId
   * @param type
   * @param [updateType='increment']
   */
  private async updateTypeCount(
    manager: EntityManager,
    id: string,
    type: 'commentCount' | 'reportCount' | 'views',
    updateType: 'increment' | 'decrement' = 'increment'
  ) {
    try {
      let result: UpdateResult;
      if (updateType === 'increment')
        result = await manager.increment(Post, { id }, type, 1);
      else result = await manager.decrement(Post, { id }, type, 1);

      return result.affected > 0;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * will add the filters list for feed
   * @param qb
   * @param filters
   * @returns
   */
  private applyPostsFilters(qb: SelectQueryBuilder<Post>, filters: any) {
    if (!filters) return;

    const requestedRange = filters?.createdAt;
    if (requestedRange)
      dateRangeFilter(qb, requestedRange, 'createdAt', 'post');

    const publishDateRange = filters?.publishedAt;
    if (publishDateRange)
      dateRangeFilter(qb, publishDateRange, 'publishedAt', 'post');
  }

  /**
   * find a post by id or slug
   * @param identifier id | slug
   * @param user
   * @param queryLevel
   * @returns
   */
  private async findOne(
    identifier: string,
    user: User | null,
    queryLevel = 1
  ): Promise<Post> {
    const qb = this.getBasicQueryBuilder(user, queryLevel);

    if (isNaN(Number(identifier))) {
      qb.andWhere('post.slug = :identifier', { identifier });
    } else {
      qb.andWhere('post.id = :identifier', { identifier });
    }

    if (user && user.isAdmin) {
    } else {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where(
            '(post.publishStatus IS NULL AND post.publishedAt <= :now AND post.unpublishedAt >= :now) or (post.publishedAt is null and post.unpublishedAt is null)',
            {
              // get
              now: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
          ).andWhere('post.publishStatus = :ps', { ps: true });
        })
      );
    }

    const foundPost = await qb.getOne();

    if (user && user.isAdmin) {
    } else {
      $.throwIf403(foundPost.publishStatus != true, '볼수 없어.');
    }

    $.requiredEntity(foundPost);

    return foundPost;
  }

  private sortPostFeed(
    user: User | null,
    qb: SelectQueryBuilder<Post>,
    pageRequest: PaginatedRequest
  ) {
    const { sortBy, sortType } = pageRequest;

    if (
      pageRequest.categoryId === 1 &&
      (!(user?.isAdmin || user?.isManager) ||
        (pageRequest.client ?? pageRequest.client))
    ) {
      const validFields: EntityKeys<Post>[] = ['createdAt', 'pin'];
      const sortField = sortBy ? sortBy : 'createdAt';
      if (!validFields.includes(sortField as EntityKeys<Post>)) {
        throw new Error('Invalid sorting field');
      }
      qb
        // .orderBy('post.pin', 'DESC')
        .orderBy(`post.${sortField}`, sortType)
        .addOrderBy('post.id', 'DESC');
    } else {
      if (pageRequest.type === PostType.main.toString()) {
        const sortFields = {
          mostViewed: 'post.views',
          mostRecent: 'post.createdAt',
          mostLiked: 'post.likeCount',
          unAnswered: 'post.commentCount',
          mostReported: 'post.reportCount',
        };
        qb.orderBy(sortFields[sortBy], sortType === 'ASC' ? 'ASC' : 'DESC');
      } else {
        applySorting(qb, 'post', pageRequest);
      }
    }
  }

  // private comparePostTypes(pageRequest: PaginatedRequest, type: PostType) {
  //   return Number(pageRequest.type) === type;
  // }

  private comparePostTypesArray(
    pageRequest: PaginatedRequest,
    types: PostType[]
  ) {
    return types.includes(Number(pageRequest.categoryId));
  }

  private comparePostCatsArray(pageRequest: PaginatedRequest, types: number[]) {
    return types.includes(pageRequest.categoryId);
  }

  private async cleanPostCache(id: string) {
    const key1 = this.cacheService.createKey('findPost', id, 0);
    const key2 = this.cacheService.createKey('findPost', id, 1);
    await this.cacheService.removeKeys([key1, key2]);
  }

  async getAdjacentPosts(
    postId: string,
    pageRequest: PaginatedRequest,
    user: User | null,
    queryLevel = 0
  ): Promise<AdjacentResponse> {
    $.requiredEntity(pageRequest.categoryId);

    const currentPost = await this.findOne(postId, user);

    // 1 is pinned; db
    const isPinned = Boolean(currentPost?.pin);

    $.requiredEntity(currentPost);

    const qb = this.getBasicQueryBuilder(user, queryLevel);

    qb.select(['post.id', 'post.title', 'post.slug', 'post.pin', 'post.tags'])
      // .skip(pageRequest.pagination.skip)
      // .take(pageRequest.pagination.take)
      .where('post.categoryId = :cid', {
        cid: pageRequest.categoryId,
      })
      .orderBy('post.id', 'DESC');

    if (
      (!(user?.isAdmin || user?.isManager) ||
        (pageRequest.client ?? pageRequest.client)) &&
      ![14].includes(pageRequest.categoryId)
    ) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where(
            'post.publishStatus IS NULL AND post.publishedAt <= :now AND post.unpublishedAt >= :now',
            {
              // get
              now: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
          ).orWhere('post.publishStatus = :ps', { ps: true });
        })
      );
    }

    if (pageRequest.query) {
      if (pageRequest.searchBy)
        applySearchQueries(
          qb,
          'post',
          [pageRequest.searchBy] as EntityKeys<Post>[],
          pageRequest.query
        );
      else applySearchQueries(qb, 'post', ['title', 'body'], pageRequest.query);
    }

    // SORT
    this.sortPostFeed(user, qb, pageRequest);

    qb.andWhere('post.id != :id', {
      id: currentPost.id,
    });

    // PRESS
    if (pageRequest?.categoryId === 2) {
      // PREV
      const previousPost = await qb
        .clone()
        .andWhere('post.id > :id', {
          at: currentPost.id,
        })
        .orderBy('post.id', 'ASC')
        .addOrderBy('post.createdAt', 'ASC')
        .getOne();

      // NXT
      const nextPost = await qb
        .clone()
        .andWhere('post.id < :id', {
          at: currentPost.id,
        })
        .getOne();

      return {
        previous: previousPost,
        next: nextPost,
      };
    }

    if (isPinned) {
      const pinnedItems = await qb
        .clone()
        .where('post.categoryId = :cid', {
          cid: pageRequest.categoryId,
        })
        .andWhere('post.pin = :pin', { pin: 1 })
        // .orderBy('post.pin', 'DESC')
        // .addOrderBy('post.id', 'DESC')
        // .addOrderBy('post.createdAt', 'DESC')
        .take(3)
        .getMany();

      const currentIndex = pinnedItems.findIndex(
        (item) => item.id === currentPost?.id
      );

      const prevItem = currentIndex > 0 ? pinnedItems[currentIndex - 1] : null;
      const nextItem =
        currentIndex < pinnedItems.length - 1
          ? pinnedItems[currentIndex + 1]
          : null;

      if (!nextItem) {
        // jump to non pins
        const nxtNonPinned = await qb
          .clone()
          .andWhere('post.pin = :pin', { pin: 0 })
          .andWhere('post.id > :id', { id: currentPost.id })
          .orderBy(`post.pin`, 'DESC')
          .addOrderBy('post.id', 'DESC')
          .getOne();

        return {
          previous: prevItem,
          next: nxtNonPinned,
        };
      }

      return {
        previous: prevItem,
        next: nextItem,
      };
    }

    // non-pinned
    qb.andWhere('post.pin = :pin', { pin: 0 });

    // PREV
    const previousPost = await qb
      .clone()
      .andWhere('post.createdAt > :at', {
        at: currentPost.createdAt,
      })
      .orderBy('post.createdAt', 'ASC')
      .addOrderBy('post.id', 'ASC')
      .getOne();

    // NXT
    const nextPost = await qb
      .clone()
      .andWhere('post.createdAt < :at', {
        at: currentPost.createdAt,
      })
      .getOne();

    // BACK TO PINNED
    if (!previousPost) {
      const prevPinned = await qb
        .clone()
        .skip(2)
        .andWhere('post.pin = :pin', { pin: 1 })
        .take(1)
        .getOne();

      return {
        previous: prevPinned,
        next: nextPost,
      };
    }

    return {
      previous: previousPost,
      next: nextPost,
    };
  }

  async isSlugExist(slug: string) {
    try {
      const count = await this.postRepository.count({
        where: {
          slug,
        },
      });

      return count > 0;
    } catch (error) {
      throw error;
    }
  }
}
