import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { CreateApplicantDTO } from './createApplicantDto';

@InputType()
export class UpdateApplicationDTO extends PartialType(
  OmitType(CreateApplicantDTO, ['prefix'])
) {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;
}
