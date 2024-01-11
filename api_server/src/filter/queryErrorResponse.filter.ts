import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';
import { Logger as WinstonLogger } from 'winston';

import { QueryErrorException } from '@App/exception/queryError.exception';
import { Request, Response } from 'express';

interface HttpExceptionForQuery extends HttpException {
  driverError: string;
}
@Catch(QueryErrorException)
export class QueryErrorResponseFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
  ) {}

  catch(exception: HttpExceptionForQuery, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse();
    const responseData = {};
    const route = `${request.method} - ${request.url}`;

    this.logger.error(route + '  DB_QUERY_ERR', exception.getResponse());

    responseData['res_data'] = {
      error_code: 'DB_QUERY_ERR',
    };
    responseData['route'] = route;
    response.status(status).json({
      success: 0,
      error: responseData,
    });
  }
}
