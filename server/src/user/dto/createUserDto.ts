import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PickType,
} from '@nestjs/graphql';

import { User } from '../user.entity';
import { UserProfile } from '../userProfile.entity';

@InputType()
class PickedFromUserProfile extends PickType(
  UserProfile,
  ['gender', 'birthday', 'phone'] as const,
  InputType
) {
  @Field({ nullable: false })
  name: string;
}

@InputType()
class PickedFromUser extends PickType(
  User,
  ['email', 'status', 'role'] as const,
  InputType
) {}

@ObjectType()
@InputType()
export class CreateUserDto extends IntersectionType(
  PickedFromUser,
  PickedFromUserProfile
) {}
