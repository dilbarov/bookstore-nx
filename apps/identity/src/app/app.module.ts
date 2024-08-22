import {
  AmqpModule,
  EnvironmentsModule,
  EXCHANGE_AUTH,
  EXCHANGE_USER,
  TypeormModule,
} from '@bookstore-nx/microservices';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';

import { DomainsModule } from '../domains/domains.module';
import { UserEntity } from '../domains/user/entities/user.entity';
import { getPostgresConfig } from '../helpers/get-postgres-config';
import { getRedisConfig } from '../helpers/get-redis-config';

@Module({
  imports: [
    EnvironmentsModule,
    AmqpModule.forRoot([EXCHANGE_USER, EXCHANGE_AUTH]),
    TypeormModule.forRoot({
      entities: [UserEntity],
      getConfig: getPostgresConfig,
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getRedisConfig,
    }),
    DomainsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
