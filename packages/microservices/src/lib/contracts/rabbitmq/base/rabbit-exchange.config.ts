export interface RabbitExchangeConfig {
  name: string;
  type: 'topic' | 'direct' | 'fanout';
  options?: AssertExchange;
}

interface AssertExchange {
  durable?: boolean;
  internal?: boolean;
  autoDelete?: boolean;
  alternateExchange?: boolean;
  arguments?: unknown | unknown[];
}
