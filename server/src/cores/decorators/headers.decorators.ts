import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface Headers {
  host: string;
  connection: string;
  language: string;
  'user-agent': string;
  'content-type': string;
  accept: string;
  site: string;
  origin: string;
  'accept-encoding': string;
  'accept-language': string;
}

export const CurrentHeaders = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    try {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req.headers;
    } catch (error) {
      return null;
    }
  }
);
