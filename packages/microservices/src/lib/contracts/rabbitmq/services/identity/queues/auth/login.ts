import { ILoginPayload, ITokens } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';

import { QUEUE_IDENTITY_OPTIONS } from '../queue.options';
import { EXCHANGE_AUTH } from '../../exchanges';

export namespace LoginContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_AUTH,
    routingKey: `${EXCHANGE_AUTH.name}-login`,
    queue: `${EXCHANGE_AUTH.name}-login`,
    queueOptions: QUEUE_IDENTITY_OPTIONS.queueOptions,
  };

  export type request = AmqpBaseRequest<ILoginPayload>;

  export type response = AmqpBaseResponse<ITokens>;
}
