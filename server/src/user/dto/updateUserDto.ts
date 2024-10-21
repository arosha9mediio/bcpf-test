import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

import { User } from '../user.entity';

@InputType()
export class UpdateUserDto extends PartialType(
  PickType(
    User,
    ['email', 'id', 'status', 'role', 'authKey'] as const,
    InputType
  )
) {
  @Field({ nullable: true })
  name?: string | null;
  // @Field({ nullable: true })
  // password?: string;
  @Field({ nullable: true })
  phone?: string;
  @Field({ nullable: true })
  accessToken?: string | null;
}
