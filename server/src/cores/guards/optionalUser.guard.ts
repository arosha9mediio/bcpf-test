import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

/**
 * this guard used at controller which guest can accept
 * if context has jwt token, it will try to append user information to the request object
 * @see {@link JwtStrategy#validate}
 */
@Injectable()
export class OptionalUserGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
  // getRequest(context: ExecutionContext) {
  //   if (context.getType() === 'http') {
  //     return context.switchToHttp().getRequest();
  //   } else {
  //     const ctx = GqlExecutionContext.create(context);
  //     return ctx.getContext().req;
  //   }
  // }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // const request = this.getRequest(context);
      // const user = request.user as User;
      // console.log({ ...user });
      await super.canActivate(context);
    } catch (error) {
      // console.log('OptionalUserGuard>>>>', { ...context });
      // console.log('OptionalUserGuard>>>>', error);
    }
    return true;
  }
}
