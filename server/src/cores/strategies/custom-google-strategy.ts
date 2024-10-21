import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GoogleOAuth } from '../oauth/google.oauth';
@Injectable()
export class GoogleCustomStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly googleOAuthService: GoogleOAuth) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async validate(req: Request): Promise<any> {
    const authToken = req.headers['authorization'];
    const idToken = authToken?.split(' ')?.[1];
    const user = await this.googleOAuthService.handleGoogleAuth(idToken);
    return user;
  }
}
