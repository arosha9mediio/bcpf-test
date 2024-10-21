import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { CreateContestDTO } from './createContestDto';

@InputType()
export class UpdateContestDTO extends PartialType(CreateContestDTO) {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;
}
