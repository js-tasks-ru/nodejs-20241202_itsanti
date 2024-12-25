import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { appendFileSync  } from 'fs';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const ts = new Date().toISOString();
    
    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: ts,
    });

    appendFileSync('errors.log', `[${ts}] ${status} - ${exception.message}\n`);
  }
}
