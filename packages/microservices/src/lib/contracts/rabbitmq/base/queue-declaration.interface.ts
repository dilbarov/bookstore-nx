import { QueueOptions, RabbitMQExchangeConfig, RequestOptions } from '@golevelup/nestjs-rabbitmq';

export interface QueueDeclaration {
  exchange: RabbitMQExchangeConfig;
  routingKey: string;
  queue: string;
  queueOptions: QueueOptions;
}

export type AdditionalQueueOptions = Pick<RequestOptions, 'headers' | 'publishOptions'>;
