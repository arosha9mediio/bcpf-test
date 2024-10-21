import { InputType, PickType } from '@nestjs/graphql';

import { User } from '../user.entity';

@InputType()
export class UpdateUserStatusDto extends PickType(User, ['id', 'status']) {}
