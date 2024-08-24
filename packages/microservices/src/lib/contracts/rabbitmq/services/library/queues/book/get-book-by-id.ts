import { IBook } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';
import { EXCHANGE_BOOK } from '../../exchanges';
import { QUEUE_LIBRARY_OPTIONS } from '../queue.options';

export namespace GetBookByIdContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_BOOK,
    routingKey: `${EXCHANGE_BOOK.name}-get-by-id`,
    queue: `${EXCHANGE_BOOK.name}-get-by-id`,
    queueOptions: QUEUE_LIBRARY_OPTIONS.queueOptions,
  };

  export type request = AmqpBaseRequest<string>;

  export type response = AmqpBaseResponse<IBook>;
}
