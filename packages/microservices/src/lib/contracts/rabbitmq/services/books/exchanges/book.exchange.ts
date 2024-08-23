import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';

export const EXCHANGE_BOOK: RabbitMQExchangeConfig = {
  name: 'book',
  type: 'direct',
};
