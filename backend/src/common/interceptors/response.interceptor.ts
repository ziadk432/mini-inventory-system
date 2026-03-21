import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../pagination/paginated-result';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((body) => {
        const res = context.switchToHttp().getResponse<Response>();
        const statusCode = res.statusCode;

        if (body instanceof PaginatedResult) {
          return {
            data: { data: body.data, meta: body.meta },
            errors: {},
            message: 'Ok',
            status_code: statusCode,
          };
        }

        return {
          data: (body as Record<string, unknown>) ?? {},
          errors: {},
          message: 'Ok',
          status_code: statusCode,
        };
      }),
    );
  }
}
