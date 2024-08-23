import { IUser } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';

import { QUEUE_IDENTITY_OPTIONS } from '../queue.options';
import { EXCHANGE_USER } from '../../exchanges';

export namespace GetUserByEmailContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_USER,
    routingKey: `${EXCHANGE_USER.name}-get-by-email`,
    ...QUEUE_IDENTITY_OPTIONS,
  };

  export type request = AmqpBaseRequest<string>;

  export type response = AmqpBaseResponse<IUser>;
}
