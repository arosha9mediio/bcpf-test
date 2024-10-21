import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { ConfigService } from '../config/config.service';
import { MessageService } from '../util/message.service';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
    private readonly mailService: MessageService
  ) {}

  async home(user: User): Promise<string> {
    return `{"stage":"${process.env?.STAGE}", "TZ":"${process.env?.TZ}", "MODE":"${process.env?.NODE_ENV}"}`;
  }
}
