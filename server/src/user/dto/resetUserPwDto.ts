/**
 * Dr.Kit
 * this is mediio Dr.Kit api server
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Field, InputType } from '@nestjs/graphql';
import { IsEmpty, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class ResetUserPwDto {
  // these value is set internally [START]
  @IsEmpty()
  id: string;
  @IsEmpty()
  passwordHash: string;
  @IsEmpty()
  businessId: string;
  // these value is set internally [END]

  @Field({ nullable: false })
  @IsNotEmpty()
  @MinLength(6)
  plainPassword?: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @MinLength(10)
  encKey?: string;
}