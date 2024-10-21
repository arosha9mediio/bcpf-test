import { Controller, UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';

import { GqlPaginatedResponse, PaginatedRequest } from '../util/page';
import { Contest } from './contests.entity';
import { User } from '../user/user.entity';
import { ContestsService } from './contests.service';
import { GqlAuthGuard } from '../cores/guards/jwtAuth.guard';
import { Roles } from '../cores/decorators/roles.decorators';
import { CreateContestDTO } from './dto/createContestDto';
import { CurrentUser } from '../cores/decorators/user.decorators';
import { UpdateContestDTO } from './dto/updateContestDto';
import { OptionalUserGuard } from '../cores/guards/optionalUser.guard';

const { RoleEnum } = User;

@ObjectType()
export class PaginatedContestResponse extends GqlPaginatedResponse(Contest) {}

@Resolver(() => Contest)
@Controller('contests')
export class ContestsController {
  constructor(private readonly contestService: ContestsService) {}

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin)
  @Mutation(() => Contest)
  createContest(
    @Args('input', { type: () => CreateContestDTO })
    createContestDTO: CreateContestDTO,
    @CurrentUser() user: User
  ) {
    return this.contestService.createContest(user, createContestDTO);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Contest)
  findContest(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User | null
  ) {
    return this.contestService.findContest(user, id);
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @Query(() => PaginatedContestResponse)
  contestsFeed(
    @Args('pageRequest', { type: () => PaginatedRequest, nullable: true })
    pageRequest: PaginatedRequest,
    @CurrentUser() user: User | null
  ) {
    return this.contestService.contestsFeed(
      user,
      PaginatedRequest.of(pageRequest)
    );
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin)
  @Mutation(() => Contest)
  updateContest(
    @Args('input', { type: () => UpdateContestDTO })
    updateContestDTO: UpdateContestDTO,
    @CurrentUser() user: User
  ) {
    return this.contestService.updateContest(user, updateContestDTO);
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin)
  @Mutation(() => Boolean)
  deleteContest(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User
  ) {
    return this.contestService.removeContest(user, id);
  }

  @Query(() => [Contest])
  getMainContest(
    @Args('pageRequest', { type: () => PaginatedRequest, nullable: true })
    pageRequest: PaginatedRequest
  ) {
    return this.contestService.getMainContests();
  }
}
