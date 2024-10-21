import { Controller, UseGuards } from '@nestjs/common';
import { Args, ID, ObjectType, Query, Resolver } from '@nestjs/graphql';

import { WorkSupport } from './broadcast.entity';
import { BroadcastService } from './broadcast.service';
import { User } from '../user/user.entity';
import { CurrentUser } from '../cores/decorators/user.decorators';
import { OptionalUserGuard } from '../cores/guards/optionalUser.guard';
import { GqlPaginatedResponse, PaginatedRequest } from '../util/page';

@ObjectType()
export class PaginatedBroadcastResponse extends GqlPaginatedResponse(
  WorkSupport
) {}

@Controller('broadcast')
@Resolver(() => WorkSupport)
export class BroadcastController {
  constructor(private readonly broadcastService: BroadcastService) {}

  @UseGuards(OptionalUserGuard)
  @Query(() => WorkSupport)
  findBroadcast(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User
  ) {
    return this.broadcastService.findBroadcast(user, id);
  }

  @UseGuards(OptionalUserGuard)
  @Query(() => PaginatedBroadcastResponse)
  broadcastFeed(
    @Args('paginatedRequest', { type: () => PaginatedRequest, nullable: true })
    pageRequest: PaginatedRequest,
    @CurrentUser() user: User
  ) {
    return this.broadcastService.broadcastFeed(
      user,
      PaginatedRequest.of(pageRequest)
    );
  }
}
