import { Injectable, NestMiddleware } from '@nestjs/common';
import * as requestIp from 'request-ip';

@Injectable()
export class IpMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: () => void) {
    const req = request as any;
    req.reqStartTime = Date.now();

    const clientIp = requestIp.getClientIp(request as any);
    (request as any).clientIp = clientIp;

    next();
  }
}
