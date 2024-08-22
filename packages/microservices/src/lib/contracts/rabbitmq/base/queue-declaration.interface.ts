import { QueueOptions, RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';

export interface QueueDeclaration {
  exchange: RabbitMQExchangeConfig;
  routingKey: string;
  queue: string;
  queueOptions: QueueOptions;
}
