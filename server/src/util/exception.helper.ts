import { HttpException, HttpStatus } from '@nestjs/common';
import { CodeAndMsg, ErrorCode } from '../constants/error';

type Action<T> = (t: T) => void;
type Supplier<T, R> = (t: T) => R;

export class Then<T> {
  static with<T>(v: T): Then<T> {
    return new Then(v);
  }
  private constructor(private value: T) {}

  let(action: Action<T>): void {
    if (this.value) {
      action(this.value);
    }
  }

  map<R>(supplier: Supplier<T, R>): Then<R> {
    const result = supplier(this.value);
    return Then.with(result);
  }
}

export default class ExceptionHelper {
  // static compareElseThrow<T>(v1: T, v2: T, codeAndMsg: CodeAndMsg): boolean {
  //   if (v1 === v2) {
  //     return true;
  //   } else {
  //     throw new HttpException(codeAndMsg, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  static throw(string: string): void {
    throw new HttpException(string, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  static throwIf<T>(v1: T, string: string): void {
    if (v1) {
      throw new HttpException(string, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  static throwIfNot<T>(v1: T, string: string): void {
    this.throwIf(!v1, string);
  }

  static throwIf500<T>(v1: T, string = ''): void {
    this.throwIf(v1, string);
  }

  static throwIf400<T>(v1: T, string = ''): void {
    if (v1) {
      throw new HttpException(string, HttpStatus.BAD_REQUEST);
    }
  }

  static throwIf404<T>(v1: T, string = ''): void {
    if (v1) {
      throw new HttpException(string, HttpStatus.NOT_FOUND);
    }
  }
  static throwIf403<T>(v1: T, string = ''): void {
    if (v1) {
      throw new HttpException(string, HttpStatus.FORBIDDEN);
    }
  }

  static throwIf401<T>(v1: T, string = ''): void {
    if (v1) {
      throw new HttpException(string, HttpStatus.UNAUTHORIZED);
    }
  }

  static compareThen<T>(v1: T, v2: T): Then<boolean> {
    return Then.with(v1 === v2);
  }

  static requiredEntity<T>(v1: T, string = 'Not found'): void {
    if (!v1) {
      throw new HttpException(string, HttpStatus.NOT_FOUND);
    }
  }
}
