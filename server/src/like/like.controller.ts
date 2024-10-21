/**
 * Like Controller
 *
 */

import { Controller, Injectable, UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { Roles } from '../cores/decorators/roles.decorators';
import { User } from '../user/user.entity';
import { LikeService } from './like.service';

import { Like, RefType } from './like.entity';

import { CurrentUser } from '../cores/decorators/user.decorators';
import { GqlAuthGuard } from '../cores/guards/jwtAuth.guard';
import {
  GqlPaginatedResponse,
  PaginatedRequest,
  PaginatedResponse,
} from '../util/page';

const { RoleEnum } = User;

@ObjectType()
export class PaginatedLikeResponse extends GqlPaginatedResponse(Like) {}

@Injectable()
@Controller('like')
@Resolver(() => Like)
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  /**
   * Get a Like
   * @author add_good_your_name
   * @param id Like id
   */
  @UseGuards(GqlAuthGuard)
  // @Roles(RoleEnum.Admin, RoleEnum.Patient, RoleEnum.Doctor)
  @Query(() => [Like])
  findLike(
    @Args('id', { type: () => ID, description: 'Like id' }) id: string,
    @CurrentUser() user: User
  ): Promise<Like> {
    return this.likeService.findLike(id, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => PaginatedLikeResponse)
  likeFeed(
    @Args('pageRequest', { type: () => PaginatedRequest, nullable: true })
    pageRequest: PaginatedRequest,
    @CurrentUser() user: User
  ): Promise<PaginatedResponse<Like>> {
    return this.likeService.likeFeed(user, pageRequest);
  }

  /**
   * Delete post
   * @author add_good_your_name
   * @param string
   */
  @UseGuards(GqlAuthGuard)
  // @Roles()
  @Mutation(() => Number)
  toggleLike(
    @Args('refType', { type: () => String, description: 'refference type' })
    refType: RefType,
    @Args('refId', { type: () => ID, description: 'refference id' })
    refId: string,
    @CurrentUser() user: User
  ): Promise<number> {
    return this.likeService.toggleLike(refType, refId, user);
  }
}
