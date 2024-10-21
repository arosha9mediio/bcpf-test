import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ObjectType,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { PostCategory } from './entites/postCategory.entity';
import { PostCategoryService } from './postCategory.service';
import { CurrentUser } from '../cores/decorators/user.decorators';
import { User } from '../user/user.entity';
import { GqlAuthGuard } from '../cores/guards/jwtAuth.guard';
import { CreatePostCategoryDto } from './dto/createPostCategory.dto';
import { Roles } from '../cores/decorators/roles.decorators';
import {
  GqlPaginatedResponse,
  PaginatedRequest,
  PaginatedResponse,
} from '../util/page';
import { UpdatePostCategoryDTO } from './dto/updatePostCategory.dto';

const { RoleEnum } = User;

@ObjectType()
export class PaginatedPostCategoryResponse extends GqlPaginatedResponse(
  PostCategory
) {}

@Resolver(() => PostCategory)
export class PostCategoryResolver {
  constructor(private readonly postCategoryService: PostCategoryService) {}

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin)
  @Mutation(() => PostCategory)
  createPostCategory(
    @Args('input', {
      type: () => CreatePostCategoryDto,
      description: 'new PostCategory',
    })
    createPostCategoryDto: CreatePostCategoryDto,
    @CurrentUser() user: User
  ): Promise<PostCategory> {
    return this.postCategoryService.createPostCategory(
      user,
      createPostCategoryDto
    );
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin)
  @Query(() => PostCategory)
  findPostCategory(
    @Args('id', { type: () => ID, description: 'postCategory id' }) id: string,
    @CurrentUser() user: User
  ): Promise<PostCategory> {
    return this.postCategoryService.findPostCategory(user, id);
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin)
  @Query(() => PaginatedPostCategoryResponse)
  postCategoryFeed(
    @Args('pageRequest', { type: () => PaginatedRequest, nullable: true })
    pageRequest: PaginatedRequest,
    @CurrentUser() user: User
  ): Promise<PaginatedResponse<PostCategory>> {
    return this.postCategoryService.postCategoryFeed(
      user,
      PaginatedRequest.of(pageRequest)
    );
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin)
  @Mutation(() => PostCategory)
  updatePostCategory(
    @Args('input', {
      type: () => UpdatePostCategoryDTO,
      description: 'update PostCategory',
    })
    updatePostCategoryDto: UpdatePostCategoryDTO,
    @CurrentUser() user: User
  ): Promise<PostCategory> {
    return this.postCategoryService.updatePostCategory(
      user,
      updatePostCategoryDto
    );
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin)
  @Mutation(() => Boolean)
  deletePostCategory(
    @Args('id', { type: () => ID, description: 'postCategory id' }) id: string,
    @CurrentUser() user: User
  ): Promise<boolean> {
    return this.postCategoryService.deletePostCategory(user, id);
  }
}
