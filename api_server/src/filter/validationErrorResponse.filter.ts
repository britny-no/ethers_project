import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { ValidationFailException } from '@App/exception/validationFail.exception';
import { Response, Request } from 'express';

@Catch(ValidationFailException)
export class ValidationErrorResponseFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse();
    const targetError = getFirstErrContext(error['message']);
    const responseData = {};

    let errData = null;

    responseData['res_data'] = {};
    //Case Validation Error Handling
    if (
      error['message'] !== undefined &&
      error['message'].length > 0 &&
      targetError.constructor.name === 'ValidationError' &&
      targetError['contexts']
    ) {
      const firstKey = Object.keys(targetError['contexts'])[0];
      errData = targetError['contexts'][firstKey];
      if (errData['errorCode']) {
        responseData['res_data']['error_code'] = errData['errorCode'];
        delete errData['errorCode'];
      }
      if (errData['detailCode']) {
        responseData['res_data']['detail_code'] = errData['detailCode'];
        delete errData['detailCode'];
      }
      if (errData['field']) {
        responseData['res_data']['field'] = errData['field'];
      }
      if (errData['target']) {
        responseData['res_data']['target'] = errData['target'];
      }
    }
    const route = `${request.method} - ${request.url}`;
    responseData['route'] = route;

    response.status(status).json({
      success: 0,
      error: responseData,
    });
  }
}

const getFirstErrContext = (message) => {
  const targetErr = message[0];
  if (!targetErr.contexts && !targetErr.children) {
    return {};
  } else if (targetErr.contexts) {
    return targetErr;
  } else if (targetErr.children) {
    return getFirstErrContext(targetErr.children);
  } else {
    return {};
  }
};
