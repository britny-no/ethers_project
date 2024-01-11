import { HttpException } from '@nestjs/common';
export class QueryErrorException extends HttpException {
  constructor(objectOrError, statusCode = 500, description = 'Common Error') {
    const httpException = HttpException.createBody(
      objectOrError,
      description,
      statusCode,
    );
    super(httpException, statusCode);
  }
}
