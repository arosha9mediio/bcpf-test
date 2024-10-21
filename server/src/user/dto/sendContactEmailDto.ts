import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

import { User } from '../user.entity';

@ObjectType()
@InputType()
export class SendContactEmailDto extends PickType(
  User,
  ['email'] as const,
  InputType
) {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @MaxLength(50)
  subject: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  message: string;
}
