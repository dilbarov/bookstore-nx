import { Any } from '@bookstore-nx/common';
import { QUEUE_LIBRARY_OPTIONS } from '@bookstore-nx/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

declare const module: Any;

const bootstrap = async (): Promise<void> => {
  const configService = new ConfigService();
  const amqpHost = configService.get('AMQP_HOST');
  const amqpPort = configService.get('AMQP_PORT');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${amqpHost}:${amqpPort}`],
      ...QUEUE_LIBRARY_OPTIONS,
      noAck: true,
    },
  });

  await app.listen();
  Logger.log(`🚀 Application [BOOKS] is running`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
};

void bootstrap();
