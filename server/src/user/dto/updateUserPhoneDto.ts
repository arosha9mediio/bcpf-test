import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

@InputType()
export class UpdateUserPhoneDto {
  @Field({ nullable: false })
  @IsNotEmpty()
  phone: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  encKey: string;
}
