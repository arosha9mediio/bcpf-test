import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import { CreatePostCategoryDto } from './createPostCategory.dto';

@InputType()
export class UpdatePostCategoryDTO extends PartialType(CreatePostCategoryDto) {
  @Field(() => ID, { nullable: false })
  id: string;
}
