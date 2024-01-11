import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ValidationPipe,
  ValidationError,
} from '@nestjs/common';

import { ValidationFailException } from '@App/exception/validationFail.exception';
import { setupSwagger } from '@App/util/swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  configService.get<string>('NODE_ENV', 'production') !== 'production'
    ? setupSwagger(app)
    : null;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new ValidationFailException(validationErrors);
      },
    }),
  );

  await app.listen(configService.get<string>('PORT', '3000'));
}
bootstrap();
