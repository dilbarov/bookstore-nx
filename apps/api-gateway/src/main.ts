import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { JwtAuthGuard } from './guards/jwt.guard';
import { MicroserviceExceptionFilter } from './exception-filters/microservice.exception-filter';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  // Cookie Parser
  app.use(cookieParser());

  app.useGlobalFilters(new MicroserviceExceptionFilter());

  app.useGlobalGuards(new JwtAuthGuard(reflector));

  const port = configService.get('API_GATEWAY_PORT');
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
};

void bootstrap();
