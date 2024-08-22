import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';

export const EXCHANGE_AUTH: RabbitMQExchangeConfig = {
  name: 'auth',
  type: 'direct',
};
