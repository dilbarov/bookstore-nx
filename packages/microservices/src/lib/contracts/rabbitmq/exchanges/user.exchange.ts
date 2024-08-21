import { RabbitExchangeConfig } from '../base/rabbit-exchange.config';

export const EXCHANGE_USER: RabbitExchangeConfig = {
  name: 'user',
  type: 'direct',
};
