import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import { CreateDonationDTO } from './create-donation.dto';

@InputType()
export class UpdateDonationDTO extends PartialType(CreateDonationDTO) {
  @Field(() => ID)
  id: string;
}
