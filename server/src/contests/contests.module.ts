import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

import { ContestsController } from './contests.controller';
import { ContestsService } from './contests.service';
import { Contest } from './contests.entity';
import { CacheService } from '../util/cache.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contest]), CacheModule.register()],
  controllers: [ContestsController],
  providers: [ContestsService, ContestsController, CacheService],
})
export class ContestsModule {}
