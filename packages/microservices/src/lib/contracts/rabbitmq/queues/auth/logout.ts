import { ILogoutPayload } from '@bookstore-nx/entities';

import { AmqpBaseRequest } from '../../base/amqp-base-request.interface';
import { AmqpBaseResponse } from '../../base/amqp-base-response.interface';
import { QueueDeclaration } from '../../base/queue-declaration.interface';
import { EXCHANGE_AUTH } from '../../exchanges/auth.exchange';

export namespace LogoutContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_AUTH,
    queue: `${EXCHANGE_AUTH.name}-logout`,
    routingKey: `${EXCHANGE_AUTH.name}-logout`,
    queueOptions: {
      durable: true,
    },
  };

  export type request = AmqpBaseRequest<ILogoutPayload>;

  export type response = AmqpBaseResponse<void>;
}
