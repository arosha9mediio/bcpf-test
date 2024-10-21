import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

import { User } from '../user.entity';

@InputType()
export class ChangeUserPwDto extends PickType(User, ['id']) {
  @Field({ nullable: false })
  @IsNotEmpty()
  @MinLength(6)
  currentPassword: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
