import { ArgumentsHost, Catch, ExceptionFilter, HttpException, InternalServerErrorException } from "@nestjs/common";
import { Response, Request } from "express";
import { appendFileSync  } from 'fs';

@Catch(Error, HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
    } else {
      status = 500;
    }
    const ts = new Date().toISOString();
    
    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: ts,
      path: request.path,
      error: null
    });

    appendFileSync('errors.log', `[${ts}] ${status} - ${exception.message}\n`);
  }
}
