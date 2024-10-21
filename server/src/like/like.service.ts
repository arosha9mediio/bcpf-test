import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import $ from '../util/exception.helper';

import { Like, RefType } from './like.entity';

import { UpdateResult } from 'typeorm';
import { Post } from '../post/entites/post.entity';
import { User } from '../user/user.entity';
import { PaginatedRequest, PaginatedResponse } from '../util/page';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>
  ) {}

  async findLike(id: string, user: User, queryLevel = 0): Promise<Like> {
    const foundLike = await this.findOne(user, id);

    $.requiredEntity(foundLike);
    //Check data Permission
    // if (!checkIsAdmin(user, false)) {
    //   checkIsOwner(user, foundLike.createdBy);
    // }

    return foundLike;
  }

  async likeFeed(
    user: User,
    pageRequest: PaginatedRequest,
    queryLevel = 0
  ): Promise<PaginatedResponse<Like>> {
    const qb = this.getQueryBuilder(user, queryLevel).where(
      'like.createdBy = :userId',
      { userId: user.id }
    );

    if (pageRequest.type) {
      qb.andWhere('like.refType = :type', { type: pageRequest.type });
    }

    const [list, total] = await qb.getManyAndCount();

    return new PaginatedResponse(list, total, pageRequest);
  }

  async toggleLike(
    refType: RefType,
    refId: string,
    user: User
  ): Promise<number> {
    return await this.likeRepository.manager.transaction(async (manager) => {
      let updated: UpdateResult;

      const condition = {
        refId: refId,
        refType: refType,
        createdBy: user.id,
      };

      const foundLike = await manager.findOne(Like, { where: condition });
      let likeCount = await manager.count(Like, {
        where: {
          refId: refId,
          refType: refType,
        },
      });

      if (foundLike) {
        await manager.getRepository(Like).remove(foundLike);
        likeCount--;
      } else {
        await manager.getRepository(Like).insert(condition);
        likeCount++;
      }

      if (refType === Like.RefType.Post) {
        //  await this.postRepository.findOneById(refId);
        updated = await manager.update(
          Post,
          {
            id: refId,
          },
          {
            likeCount,
          }
        );
      }

      $.requiredEntity(updated.affected > 0);

      return likeCount;
    });
  }

  private async findOne(user: User, id: string, queryLevel = 0): Promise<Like> {
    const qb = this.getQueryBuilder(user, queryLevel);

    qb.andWhere('like.refId = :id', { id: id });
    const foundLike = await qb.getOne();

    $.requiredEntity(foundLike);

    return foundLike;
  }

  /**
   * use to get the query builder
   * @param user
   * @param queryLevel to include joins
   * @returns query builder with 'like' alias
   */
  private getQueryBuilder(user: User, queryLevel = 0) {
    const qb = this.likeRepository.createQueryBuilder('like');

    if (queryLevel > 0) qb.leftJoinAndSelect('like.User', 'User');

    return qb;
  }
}
