import { Field, InputType, PickType } from '@nestjs/graphql';

import { UserProfile } from '../userProfile.entity';

@InputType()
export class CreateUserProfileDto extends PickType(
  UserProfile,
  [
    'birthday',
    'avatarPath',
    'gender',
    'other',
    'phone',
    'nationality',
    'language',
    'address',
  ] as const,
  InputType
) {
  @Field({ nullable: false })
  status: number;
  @Field({ nullable: false })
  role: string;
  @Field({ nullable: false })
  name: string;
}
