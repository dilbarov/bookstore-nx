import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';

export const EXCHANGE_FAVORITE: RabbitMQExchangeConfig = {
  name: 'favorite',
  type: 'direct',
};
