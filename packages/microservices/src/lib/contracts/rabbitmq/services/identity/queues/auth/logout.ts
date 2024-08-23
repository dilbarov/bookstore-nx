import { ILogoutPayload } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';
import { QUEUE_IDENTITY_OPTIONS } from '../queue.options';
import { EXCHANGE_AUTH } from '../../exchanges';

export namespace LogoutContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_AUTH,
    routingKey: `${EXCHANGE_AUTH.name}-logout`,
    ...QUEUE_IDENTITY_OPTIONS,
  };

  export type request = AmqpBaseRequest<ILogoutPayload>;

  export type response = AmqpBaseResponse<void>;
}
