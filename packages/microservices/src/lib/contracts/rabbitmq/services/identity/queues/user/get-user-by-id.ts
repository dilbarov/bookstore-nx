import { IUser } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';
import { EXCHANGE_USER } from '../../exchanges';
import { QUEUE_IDENTITY_OPTIONS } from '../queue.options';

export namespace GetUserByIdContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_USER,
    routingKey: `${EXCHANGE_USER.name}-get-by-id`,
    queue: `${EXCHANGE_USER.name}-get-by-id`,
    queueOptions: QUEUE_IDENTITY_OPTIONS.queueOptions,
  };

  export type request = AmqpBaseRequest<string>;

  export type response = AmqpBaseResponse<IUser>;
}
