import { InputType, PickType } from '@nestjs/graphql';

import { PostCategory } from '../entites/postCategory.entity';

@InputType()
export class CreatePostCategoryDto extends PickType(
  PostCategory,
  ['title'] as const,
  InputType
) {}
