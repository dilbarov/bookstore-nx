import { Any } from '@bookstore-nx/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DataSource } from 'typeorm';

import { AppModule } from './app/app.module';

declare const module: Any;

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {},
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

  Logger.log(`🚀 Application [IDENTITY] is running`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
};

void bootstrap();
