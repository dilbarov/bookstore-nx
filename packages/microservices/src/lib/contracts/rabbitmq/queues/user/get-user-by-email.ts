import { IUser } from '@bookstore-nx/entities';

import { AmqpBaseRequest } from '../../base/amqp-base-request.interface';
import { AmqpBaseResponse } from '../../base/amqp-base-response.interface';
import { QueueDeclaration } from '../../base/queue-declaration.interface';
import { EXCHANGE_USER } from '../../exchanges';

export namespace GetUserByEmailContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_USER,
    queue: `${EXCHANGE_USER.name}-get-by-email`,
    routingKey: `${EXCHANGE_USER.name}-get-by-email`,
    queueOptions: {
      durable: true,
    },
  };

  export type request = AmqpBaseRequest<string>;

  export type response = AmqpBaseResponse<IUser>;
}
