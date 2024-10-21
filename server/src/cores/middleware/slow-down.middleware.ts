import { Injectable, NestMiddleware } from '@nestjs/common';
import slowDown from 'express-slow-down';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class SlowDownMiddleware implements NestMiddleware {
  private slowDown: any;

  constructor(
    private readonly configService: ConfigService // private readonly logger: MyLoggerService,
  ) {
    this.slowDown = slowDown({
      windowMs: 10 * 1000, // 15 minutes
      delayAfter: 10, // allow 100 requests per 15 minutes, then...
      delayMs: 2000, // begin adding 500ms of delay per request above 100:
    });
  }

  use(request: Request, response: Response, next: () => void) {
    const req: any = request;
    const res: any = response;

    this.slowDown(req, res, next);
  }
}
