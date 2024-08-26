import { Any } from '@bookstore-nx/common';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { MicroserviceExceptionFilter } from './shared/exception-filters/microservice.exception-filter';
import { JwtAuthGuard } from './shared/guards/jwt.guard';

declare const module: Any;

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  // Cookie Parser
  app.use(cookieParser());

  app.useGlobalFilters(new MicroserviceExceptionFilter());

  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // Validation request data to Type in code
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: false,
      // https://stackoverflow.com/questions/59531427/why-should-we-not-use-enableimplicitconversion-when-using-class-transformer
      transformOptions: {
        enableImplicitConversion: false,
      },
    }),
  );

  app.enableCors();

  const port = configService.get('API_GATEWAY_PORT');
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
  Logger.log(`🚀 GraphQL Playground is running on: http://localhost:${port}/graphql`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
};

void bootstrap();
