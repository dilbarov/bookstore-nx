import { IUser } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';
import { QUEUE_IDENTITY_OPTIONS } from '../queue.options';
import { EXCHANGE_USER } from '../../exchanges';

type UserCreateRequest = Pick<IUser, 'email'> & { password?: string };

export namespace CreateUserContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_USER,
    routingKey: `${EXCHANGE_USER.name}-create`,
    ...QUEUE_IDENTITY_OPTIONS,
  };

  export type request = AmqpBaseRequest<UserCreateRequest>;

  export type response = AmqpBaseResponse<IUser>;
}
