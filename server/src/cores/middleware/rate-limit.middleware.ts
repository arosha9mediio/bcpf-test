import { Injectable, NestMiddleware } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private rateLimit: any;

  constructor(
    private readonly configService: ConfigService // private readonly logger: MyLoggerService,
  ) {
    this.rateLimit = rateLimit({
      windowMs: 5 * 1000,
      max: 15,
      message: 'Sorry^^ Server is running now.',
      headers: false,
      skipSuccessfulRequests: true,
      statusCode: 501,
    });
  }

  use(request: Request, response: Response, next: () => void) {
    const req: any = request;
    const res: any = response;

    this.rateLimit(req, res, next);
  }
}
