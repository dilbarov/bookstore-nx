import { IAuthor } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';
import { EXCHANGE_AUTHOR } from '../../exchanges';
import { QUEUE_LIBRARY_OPTIONS } from '../queue.options';

export namespace GetAuthorByIdContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_AUTHOR,
    routingKey: `${EXCHANGE_AUTHOR.name}-get-by-id`,
    queue: `${EXCHANGE_AUTHOR.name}-get-by-id`,
    queueOptions: QUEUE_LIBRARY_OPTIONS.queueOptions,
  };

  export type request = AmqpBaseRequest<string>;

  export type response = AmqpBaseResponse<IAuthor>;
}
