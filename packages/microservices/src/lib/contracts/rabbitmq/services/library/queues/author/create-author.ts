import { IAuthor } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';
import { EXCHANGE_AUTHOR } from '../../exchanges';
import { QUEUE_LIBRARY_OPTIONS } from '../queue.options';

type AuthorCreateRequest = Pick<IAuthor, 'name'>;

export namespace CreateAuthorContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_AUTHOR,
    routingKey: `${EXCHANGE_AUTHOR.name}-create`,
    queue: `${EXCHANGE_AUTHOR.name}-create`,
    queueOptions: QUEUE_LIBRARY_OPTIONS.queueOptions,
  };

  export type request = AmqpBaseRequest<AuthorCreateRequest>;

  export type response = AmqpBaseResponse<IAuthor>;
}
