export interface AmqpBaseRequest<T = unknown> {
  type: string;
  payload: T | null;
  requestId: string;
  timestamp: string;
  exchange?: string;
  routingKey?: string;
}
