import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { v4 } from 'uuid';
import {
  AdditionalQueueOptions,
  AmqpBaseRequest,
  AmqpBaseResponse,
  MicroserviceBaseError,
  QueueDeclaration,
} from '@bookstore-nx/microservices';

@Injectable()
export class AmqpService {
  public constructor(private readonly amqpConnection: AmqpConnection) {}

  public async request<TRequest extends AmqpBaseRequest, TResponse extends AmqpBaseResponse>(
    queue: QueueDeclaration,
    payload: TRequest['payload'],
    options?: AdditionalQueueOptions,
  ): Promise<TResponse['payload'] | null> {
    const enrichedPayload = this.enrichPayload<TRequest['payload']>(queue, payload, options);
    const result = await this.amqpConnection.request<AmqpBaseResponse<TResponse>>({
      exchange: queue.exchange.name,
      routingKey: queue.routingKey,
      payload: enrichedPayload,
    });

    if (result.error) {
      throw new MicroserviceBaseError(result.error.code, result.error.message, result.error.statusCode);
    }

    return result.payload;
  }

  public async publish<TRequest extends AmqpBaseRequest>(
    queue: QueueDeclaration,
    payload: TRequest['payload'],
    options?: AdditionalQueueOptions,
  ): Promise<void> {
    const enrichedPayload = this.enrichPayload<TRequest['payload']>(queue, payload, options);

    await this.amqpConnection.publish(queue.exchange.name, queue.routingKey, enrichedPayload);
  }

  private enrichPayload<TPayload>(
    queue: QueueDeclaration,
    payload: TPayload,
    options: AdditionalQueueOptions = {},
  ): AmqpBaseRequest<TPayload> {
    return {
      payload,
      type: queue.exchange.type || 'direct',
      requestId: v4(),
      timestamp: new Date().toISOString(),
      exchange: queue.exchange.name,
      routingKey: queue.routingKey,
      ...options,
    };
  }
}
