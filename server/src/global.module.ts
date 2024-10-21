import { Global, Module } from '@nestjs/common';

import { AWSService } from './util/aws.service';
import { MessageService } from './util/message.service';
import { ConfigService } from './config/config.service';

@Global()
@Module({
  controllers: [],
  providers: [MessageService, AWSService, ConfigService],
  exports: [MessageService, AWSService, ConfigService],
})
export class GlobalModule {}
