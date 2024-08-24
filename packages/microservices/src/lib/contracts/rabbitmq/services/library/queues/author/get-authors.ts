import { IAuthor, IAuthorQuery } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';
import { EXCHANGE_AUTHOR } from '../../exchanges';
import { QUEUE_LIBRARY_OPTIONS } from '../queue.options';

export namespace GetAuthorsContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_AUTHOR,
    routingKey: `${EXCHANGE_AUTHOR.name}-get-by-query`,
    queue: `${EXCHANGE_AUTHOR.name}-get-by-query`,
    queueOptions: QUEUE_LIBRARY_OPTIONS.queueOptions,
  };

  export type request = AmqpBaseRequest<IAuthorQuery>;

  export type response = AmqpBaseResponse<[IAuthor[], number]>;
}
