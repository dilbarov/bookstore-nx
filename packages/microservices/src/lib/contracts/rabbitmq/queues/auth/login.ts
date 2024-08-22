import { ILoginPayload, ITokens } from '@bookstore-nx/entities';

import { AmqpBaseRequest } from '../../base/amqp-base-request.interface';
import { AmqpBaseResponse } from '../../base/amqp-base-response.interface';
import { QueueDeclaration } from '../../base/queue-declaration.interface';
import { EXCHANGE_AUTH } from '../../exchanges/auth.exchange';

export namespace LoginContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_AUTH,
    queue: `${EXCHANGE_AUTH.name}-login`,
    routingKey: `${EXCHANGE_AUTH.name}-login`,
    queueOptions: {
      durable: true,
    },
  };

  export type request = AmqpBaseRequest<ILoginPayload>;

  export type response = AmqpBaseResponse<ITokens>;
}
