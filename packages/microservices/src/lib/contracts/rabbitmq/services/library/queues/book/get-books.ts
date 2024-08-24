import { IBook, IBookQuery } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';
import { EXCHANGE_BOOK } from '../../exchanges';
import { QUEUE_LIBRARY_OPTIONS } from '../queue.options';

export namespace GetBooksContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_BOOK,
    routingKey: `${EXCHANGE_BOOK.name}-get-by-query`,
    queue: `${EXCHANGE_BOOK.name}-get-by-query`,
    queueOptions: QUEUE_LIBRARY_OPTIONS.queueOptions,
  };

  export type request = AmqpBaseRequest<IBookQuery>;

  export type response = AmqpBaseResponse<[IBook[], number]>;
}
