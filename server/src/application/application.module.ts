import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ContestApply } from './application.entity';
import { ExcelService } from '../util/excel.service';
import { ContestsService } from '../contests/contests.service';
import { Contest } from '../contests/contests.entity';
import { CacheService } from '../util/cache.service';
import { AWSService } from '../util/aws.service';
import { FileService } from 'src/util/file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContestApply, Contest]),
    CacheModule.register(),
  ],
  controllers: [ApplicationController],
  providers: [
    ApplicationService,
    ApplicationController,
    ExcelService,
    ContestsService,
    CacheService,
    AWSService,
    FileService,
  ],
})
export class ApplicationModule {}
