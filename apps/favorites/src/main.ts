import { Any } from '@bookstore-nx/common';
import { QUEUE_FAVORITE_OPTIONS } from '@bookstore-nx/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DataSource } from 'typeorm';

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
      ...QUEUE_FAVORITE_OPTIONS,
      noAck: true,
    },
  });

  // Connect to database
  try {
    const dataSource = app.get(DataSource);
    Logger.log('Database connected.', 'TypeORM');
    Logger.log('Starting migrations...', 'TypeORM');
    await dataSource.runMigrations();
    Logger.log('Migrations have been completed!', 'TypeORM');
  } catch (error) {
    Logger.log(`error`, 'TypeORM connection error: ', error);
  }

  await app.listen();

  Logger.log(`🚀 Application [FAVORITES] is running`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
};

void bootstrap();
