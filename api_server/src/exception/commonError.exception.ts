import { HttpException } from '@nestjs/common';
export class CommonErrorException extends HttpException {
  constructor(objectOrError, statusCode = 400, description = 'Common Error') {
    const httpException = HttpException.createBody(
      objectOrError,
      description,
      statusCode,
    );
    super(httpException, statusCode);
  }
}
