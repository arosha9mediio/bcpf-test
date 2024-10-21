import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '../post/entites/post.entity';
import { User } from '../user/user.entity';
import { LikeController } from './like.controller';
import { Like } from './like.entity';
import { LikeService } from './like.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Like, Post, User])],
  providers: [LikeController, LikeService],
  exports: [LikeService],
})
export class LikeModule {}
