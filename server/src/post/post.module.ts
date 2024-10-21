import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

import { Post } from './entites/post.entity';
import { PostCategory } from './entites/postCategory.entity';
import { PostResolver } from './post.controller';
import { PostService } from './post.service';
import { PostCategoryResolver } from './postCategory.controller';
import { PostCategoryService } from './postCategory.service';
import { CacheService } from '../util/cache.service';
import { AWSService } from '../util/aws.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostCategory]),
    CacheModule.register(),
  ],
  providers: [
    PostResolver,
    PostService,
    PostCategoryResolver,
    PostCategoryService,
    Logger,
    CacheService,
    AWSService,
  ],
  controllers: [PostResolver],
})
export class PostModule {}
