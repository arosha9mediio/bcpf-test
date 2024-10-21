import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

import { BroadcastService } from './broadcast.service';
import { BroadcastController } from './broadcast.controller';
import { WorkSupport } from './broadcast.entity';
import { CacheService } from '../util/cache.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkSupport]), CacheModule.register()],
  providers: [BroadcastService, BroadcastController, CacheService],
  controllers: [BroadcastController],
})
export class BroadcastModule {}
