import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';
import { Donation } from './donation.entity';
import { CacheService } from '../util/cache.service';

@Module({
  imports: [TypeOrmModule.forFeature([Donation]), CacheModule.register()],
  controllers: [DonationsController],
  providers: [DonationsService, DonationsController, CacheService],
})
export class DonationsModule {}
