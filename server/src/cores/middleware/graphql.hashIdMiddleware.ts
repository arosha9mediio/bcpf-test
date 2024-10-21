import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import Hashids from 'hashids';

export const hashIdMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn
) => {
  const hashids = new Hashids(
    /* salt: */ '🌸💮🏵️🌹🥀🌺🌻🌼🌷🌱🌲🌳🌴🌵🌾🌿☘️🍀🍁🍂🍃🍄',
    /* minLength: */ 12,
    /* alphabet: */ 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
    /* these chars can't be next to one another: */ ''
  );

  const value = await next();
  // return value;

  try {
    if (typeof parseInt(value) == 'number') {
      return hashids.encode([parseInt(value)]);
    } else {
      return hashids.decode(value);
    }
  } catch (e) {
    return value;
  }
};
