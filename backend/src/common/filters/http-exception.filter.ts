import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: Record<string, any> = {};

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const body = exception.getResponse();

      if (typeof body === 'string') {
        message = body;
      } else if (typeof body === 'object' && body !== null) {
        const obj = body as Record<string, unknown>;
        message = (obj['message'] as string) ?? exception.message;
        errors = (obj['errors'] as Record<string, unknown>) ?? {};

        if (Array.isArray(obj['message'])) {
          message = 'Validation failed';
          errors = (obj['errors'] as Record<string, unknown>) ?? {};

          if (Object.keys(errors).length === 0) {
            errors = { validation: obj['message'] as string[] };
          }
        }
      }
    }

    res.status(statusCode).json({
      data: {},
      errors,
      message,
      status_code: statusCode,
    });
  }
}
