import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';

export const EXCHANGE_AUTHOR: RabbitMQExchangeConfig = {
  name: 'author',
  type: 'direct',
};
