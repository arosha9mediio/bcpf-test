import { GqlExecutionContext } from '@nestjs/graphql';
// import from '@nestjs/passport'
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../user/user.entity';

@Injectable()
export class GqlAuthGuard extends AuthGuard([
  'jwt',
  // 'google',
  // 'kakao',
  // 'naver',
]) {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  getRequest(context: ExecutionContext) {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    } else {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      if (!(await super.canActivate(context))) {
        return false;
      }
      const request = this.getRequest(context);
      // check roles
      const roles = this.reflector.get<number[]>('roles', context.getHandler());

      if (!roles) {
        return true;
      }
      const user = request.user as User;
      const hasRole = (role) => !!roles.find((item) => item === role);

      return user && hasRole(user.role);
    } catch (e) {
      return false;
    }
  }
}
