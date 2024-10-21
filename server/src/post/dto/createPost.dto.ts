import { InputType, PickType } from '@nestjs/graphql';

import { Post } from '../entites/post.entity';

@InputType()
export class CreatePostDTO extends PickType(
  Post,
  [
    'categoryId',
    'topicId',
    'type',
    'title',
    'preview',
    'body',
    'pin',
    'tags',
    'publishedAt',
    'unpublishedAt',
    'createdAt',
    'noticeType',
    'slug',
    'description',
    'file',
    'subTitle',
    'language',
    'publishStatus',
    'keywords',
    'metaDescription',
    // 'contestId',
  ] as const,
  InputType
) {}
