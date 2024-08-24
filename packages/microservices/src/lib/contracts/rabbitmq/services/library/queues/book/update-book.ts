import { IBook } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';
import { EXCHANGE_BOOK } from '../../exchanges';
import { QUEUE_LIBRARY_OPTIONS } from '../queue.options';

type BookUpdateRequest = Pick<IBook, 'id' | 'title' | 'description' | 'language'> & {
  authorId: string;
};

export namespace UpdateBookContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_BOOK,
    routingKey: `${EXCHANGE_BOOK.name}-update`,
    queue: `${EXCHANGE_BOOK.name}-update`,
    queueOptions: QUEUE_LIBRARY_OPTIONS.queueOptions,
  };

  export type request = AmqpBaseRequest<BookUpdateRequest>;

  export type response = AmqpBaseResponse<IBook>;
}
