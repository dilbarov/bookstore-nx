import { ILogoutPayload } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';
import { QUEUE_IDENTITY_OPTIONS } from '../queue.options';
import { EXCHANGE_AUTH } from '../../exchanges';

export namespace LogoutContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_AUTH,
    routingKey: `${EXCHANGE_AUTH.name}-logout`,
    queue: `${EXCHANGE_AUTH.name}-logout`,
    queueOptions: QUEUE_IDENTITY_OPTIONS.queueOptions,
  };

  export type request = AmqpBaseRequest<ILogoutPayload>;

  export type response = AmqpBaseResponse<void>;
}
