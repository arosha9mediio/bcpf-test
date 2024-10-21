import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    try {
      let req;
      if (context.getType() === 'http') {
        req = context.switchToHttp().getRequest();
      } else {
        const ctx = GqlExecutionContext.create(context);
        req = ctx.getContext().req;
      }

      const user = req.user;
      user.ip = req.clientIp;
      return user;
    } catch (error) {
      return null;
    }
  }
);
