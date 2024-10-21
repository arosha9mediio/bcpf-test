import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { hashIds } from '../../util/encryption';

export const hashIdMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn
) => {
  const value = await next();
  return hashIds(value);
};
