import { HttpException, HttpStatus } from '@nestjs/common';
import { CodeAndMsg, ErrorCode } from '../../constants/error';

export type Field<T> = Partial<T>;
export type FieldErrorResponse<T> = CodeAndMsg & { fields: Field<T> };

export class FieldErrorException<T> extends HttpException {
  static responseWith<T>(fields: Field<T>): FieldErrorResponse<T> {
    return {
      ...ErrorCode.ParamsError,
      fields,
    };
  }

  constructor(fields: Field<T>);
  constructor(fields: Field<T>, errorCode: CodeAndMsg);
  constructor(fields?: Field<T>) {
    super(Object.values(fields)?.[0], HttpStatus.OK);
  }
}
