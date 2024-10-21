import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now(); //현재 시간을 얻기 위해 사용됨
    return next.handle().pipe(
      tap(() => console.log(`time is ${Date.now() - now}ms`)), // 로깅 처리
      map((responseData) => responseData), // 클라이언트에게 반환 되는 정보(각 컨트롤러 결과 값)
      catchError((err) => {
        // throwError(() => new BadGatewayException());
        const errorName = err.name;
        if (errorName == errorName) {
          throw err;
        }
        throw err;
      }) // 예외 발생시 처리
    );
  }
}
