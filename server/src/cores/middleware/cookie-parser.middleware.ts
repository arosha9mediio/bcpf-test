import { Injectable, NestMiddleware } from '@nestjs/common';
import cookieParser from 'cookie-parser';

@Injectable()
export class CookieParserMiddleware implements NestMiddleware {
  private cookieParser: any;

  constructor() {
    this.cookieParser = cookieParser('aiwyskgun7cwimjq');
  }

  use(request: Request, response: Response, next: () => void) {
    const req: any = request;
    const res: any = response;

    this.cookieParser(req, res, next);
  }
}
