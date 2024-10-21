import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../user/user.entity';

import _ from 'lodash';
import $ from '../util/exception.helper';

import { PostCategory } from './entites/postCategory.entity';
import { UpdatePostCategoryDTO } from './dto/updatePostCategory.dto';
import { CreatePostCategoryDto } from './dto/createPostCategory.dto';
import { PaginatedRequest, PaginatedResponse } from '../util/page';
import { checkIsAdmin } from '../util/auth';
import { applySearchQueries } from '../util/filters';
// import { CacheService } from '../util/cache.service';

@Injectable()
export class PostCategoryService {
  constructor(
    @InjectRepository(PostCategory)
    private readonly postCategoryRepository: Repository<PostCategory>
    // private readonly cacheService: CacheService
  ) {}

  async createPostCategory(
    user: User,
    createPostCategoryDto: CreatePostCategoryDto
  ): Promise<PostCategory> {
    return await this.postCategoryRepository.manager.connection.transaction(
      async (manager) => {
        return await manager.getRepository(PostCategory).save({
          ..._.omitBy(createPostCategoryDto, _.isUndefined),
        });
      }
    );
  }

  async postCategoryFeed(
    user: User,
    pageRequest: PaginatedRequest
  ): Promise<PaginatedResponse<PostCategory>> {
    const qb = this.postCategoryRepository
      .createQueryBuilder('postCategory')
      .skip(pageRequest.pagination.skip)
      .take(pageRequest.pagination.take)
      .orderBy('postCategory.id', 'DESC');

    if (!checkIsAdmin(user, false)) {
      qb.andWhere('postCategory.userId = :userId', { userId: user.id });
      qb.andWhere('postCategory.createdBy = :createdBy', {
        createdBy: user.id,
      });
    }

    if (pageRequest.query)
      applySearchQueries(qb, 'postCategory', ['title'], pageRequest.query);

    const [list, total] = await qb.getManyAndCount();

    return new PaginatedResponse(list, total, pageRequest);
  }

  async findPostCategory(user: User, id: string): Promise<PostCategory> {
    const foundPostCategory = await this.findOne(user, id);

    checkIsAdmin(user);

    return foundPostCategory;
  }

  private async findOne(
    user: User,
    id: string,
    queryLevel = 1
  ): Promise<PostCategory> {
    const qb = this.getFullQuery(user, queryLevel);

    qb.andWhere('postCategory.id = :id', { id: id });
    const foundPostCategory = await qb.getOne();

    $.requiredEntity(foundPostCategory);

    return foundPostCategory;
  }

  async updatePostCategory(
    user: User,
    updatePostCategoryDto: UpdatePostCategoryDTO,
    queryLevel = 0
  ): Promise<PostCategory> {
    await this.postCategoryRepository.manager.transaction(async (manager) => {
      await this.findOne(user, updatePostCategoryDto.id, queryLevel);
      checkIsAdmin(user);

      await manager.update(
        PostCategory,
        {
          id: updatePostCategoryDto.id,
        },
        {
          ..._.omitBy(updatePostCategoryDto, _.isUndefined),
        }
      );
    });
    return await this.findOne(user, updatePostCategoryDto.id, queryLevel);
  }

  async deletePostCategory(
    user: User,
    id: string,
    queryLevel = 0
  ): Promise<boolean> {
    try {
      const foundPostCategory = await this.findOne(user, id, queryLevel);

      checkIsAdmin(user);

      const result =
        await this.postCategoryRepository.remove(foundPostCategory);

      return !!result;
    } catch (error) {
      throw error;
    }
  }

  private getFullQuery(
    user: User,
    queryLevel = 1
  ): SelectQueryBuilder<PostCategory> {
    const qb = this.postCategoryRepository.createQueryBuilder('postCategory');

    // todo
    if (queryLevel > 0) {
    }

    return qb;
  }

  // async loadCategoriesToCache(): Promise<void> {
  //   const categories = await this.postCategoryRepository.find();
  //   const categoryMap = categories.reduce(
  //     (acc, category) => {
  //       acc[category.title] = category.id;
  //       return acc;
  //     },
  //     {} as { [title: string]: string }
  //   );

  //   this.cacheService.setCategories(categoryMap);
  // }

  // getCategoryIdByTitle(title: string): string | undefined {
  //   const categories = this.cacheService.getCategories();
  //   return categories[title];
  // }

  // getAllCategories(): { [title: string]: string } {
  //   return this.cacheService.getCategories();
  // }
}
