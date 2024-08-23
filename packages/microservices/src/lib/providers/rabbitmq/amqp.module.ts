import {
  AmqpConnectionManager,
  RabbitMQExchangeConfig,
  RabbitMQModule,
  RabbitRpcParamsFactory,
} from '@golevelup/nestjs-rabbitmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { amqpConfig } from './amqp.config';
import { AmqpService } from './amqp.service';

@Module({})
export class AmqpModule {
  public static forRoot(exchanges: RabbitMQExchangeConfig[]): DynamicModule {
    return {
      module: AmqpModule,
      imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => amqpConfig(configService, exchanges),
        }),
      ],
      providers: [RabbitRpcParamsFactory, AmqpConnectionManager, AmqpService],
      exports: [RabbitMQModule, AmqpService],
    };
  }
}
