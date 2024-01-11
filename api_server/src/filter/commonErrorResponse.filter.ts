import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';
import { Logger as WinstonLogger } from 'winston';

import { CommonErrorException } from '@App/exception/commonError.exception';
import { Request, Response } from 'express';

@Catch(CommonErrorException)
export class CommonErrorResponseFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
  ) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse();
    const responseData = {};
    const route = `${request.method} - ${request.url}`;
    if (error['errorCode']) {
      error['error_code'] = error['errorCode'];
      delete error['errorCode'];
    }
    if (error['detailCode']) {
      error['detail_code'] = error['detailCode'];
      delete error['detailCode'];
    }

    this.logger.error(
      `${route} ${error['error_code']} ${error['detail_code']} `,
      {
        ...request.body,
        ...request.query,
      },
      exception.getResponse(),
    );

    responseData['res_data'] = error;
    responseData['route'] = route;
    response.status(status).json({
      success: 0,
      error: responseData,
    });
  }
}
