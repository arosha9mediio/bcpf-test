import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { CreateUserProfileDto } from './createUserProfileDto';

@InputType()
export class UpdateUserProfileDto extends PartialType(CreateUserProfileDto) {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  userId: string;
}
