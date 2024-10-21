import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CommonOAuth2 } from '../oauth/common.oauth2';
@Injectable()
export class KakaoCustomStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly commonOAuth2: CommonOAuth2) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async validate(req: Request): Promise<any> {
    const authToken = req.headers['authorization'];
    const idToken = authToken?.split(' ')?.[1];
    const user = await this.commonOAuth2.handleKakaoAuth(idToken);
    return user;
  }
}
