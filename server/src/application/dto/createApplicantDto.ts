import { Field, InputType, OmitType } from '@nestjs/graphql';

import { ContestApply } from '../application.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateApplicantDTO extends OmitType(
  ContestApply,
  ['id', 'createdAt', 'updatedAt', 'Contest'] as const,
  InputType
) {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  prefix: string;
}
