import { IRefreshTokensPayload, ITokens } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';
import { QUEUE_IDENTITY_OPTIONS } from '../queue.options';
import { EXCHANGE_AUTH } from '../../exchanges';

export namespace RefreshTokensContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_AUTH,
    routingKey: `${EXCHANGE_AUTH.name}-refresh`,
    queue: `${EXCHANGE_AUTH.name}-refresh`,
    queueOptions: QUEUE_IDENTITY_OPTIONS.queueOptions,
  };

  export type request = AmqpBaseRequest<IRefreshTokensPayload>;

  export type response = AmqpBaseResponse<ITokens>;
}
