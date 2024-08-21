import { IUser } from '@bookstore-nx/entities';

import { AmqpBaseRequest } from '../../base/amqp-base-request.interface';
import { AmqpBaseResponse } from '../../base/amqp-base-response.interface';
import { QueueDeclaration } from '../../base/queue-declaration.interface';
import { EXCHANGE_USER } from '../../exchanges';

type UserCreateRequest = Pick<IUser, 'email'> & { password?: string };

export namespace CreateUserContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_USER,
    queue: `${EXCHANGE_USER.name}-create`,
    routingKey: `${EXCHANGE_USER.name}-create`,
    queueOptions: {
      durable: true,
    },
  };

  export type request = AmqpBaseRequest<UserCreateRequest>;

  export type response = AmqpBaseResponse<IUser>;
}
