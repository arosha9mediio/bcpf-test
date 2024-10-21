import { Controller, UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';

import { Donation } from './donation.entity';
import { DonationsService } from './donations.service';
import { GqlAuthGuard } from '../cores/guards/jwtAuth.guard';
import { User } from '../user/user.entity';
import { Roles } from '../cores/decorators/roles.decorators';
import { CreateDonationDTO } from './dto/create-donation.dto';
import { CurrentUser } from '../cores/decorators/user.decorators';
import { GqlPaginatedResponse, PaginatedRequest } from '../util/page';
import { UpdateDonationDTO } from './dto/update-donation.dto';

const { RoleEnum } = User;

@ObjectType()
export class PaginatedDonationResponse extends GqlPaginatedResponse(Donation) {}

@Resolver(() => Donation)
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @UseGuards(GqlAuthGuard) // need guards?
  @Roles(RoleEnum.Admin)
  @Mutation(() => Donation)
  createDonation(
    @Args('input', { type: () => CreateDonationDTO })
    createDonationDTO: CreateDonationDTO,
    @CurrentUser() user: User
  ) {
    return this.donationsService.createDonations(user, createDonationDTO);
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin)
  @Query(() => Donation)
  findDonation(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User
  ) {
    return this.donationsService.findDonation(user, id);
  }

  //   @UseGuards(GqlAuthGuard)
  //   @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @Query(() => PaginatedDonationResponse)
  donationFeed(
    @Args('pageRequest', { type: () => PaginatedRequest, nullable: true })
    pageRequest: PaginatedRequest,
    @CurrentUser() user: User | null
  ) {
    return this.donationsService.donationsFeed(
      user,
      PaginatedRequest.of(pageRequest)
    );
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin)
  @Mutation(() => Donation)
  updateDonation(
    @Args('input', { type: () => UpdateDonationDTO })
    updatePageDTO: UpdateDonationDTO,
    @CurrentUser() user: User
  ) {
    return this.donationsService.updateDonation(user, updatePageDTO);
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin)
  @Mutation(() => Boolean)
  deleteDonation(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User
  ) {
    return this.donationsService.removeDonation(user, id);
  }
}
