import { InputType, PickType } from '@nestjs/graphql';

import { Donation } from '../donation.entity';

@InputType()
export class CreateDonationDTO extends PickType(
  Donation,
  ['names', 'price', 'sort', 'statusId', 'month', 'year', 'type'] as const,
  InputType
) {}
