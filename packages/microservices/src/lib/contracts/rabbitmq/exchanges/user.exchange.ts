import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';

export const EXCHANGE_USER: RabbitMQExchangeConfig = {
  name: 'user',
  type: 'direct',
};
