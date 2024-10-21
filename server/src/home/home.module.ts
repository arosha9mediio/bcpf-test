// @ts-nocheck
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

// @Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [HomeController],
  providers: [HomeService, HomeController],
  exports: [],
})
export class HomeModule {}
