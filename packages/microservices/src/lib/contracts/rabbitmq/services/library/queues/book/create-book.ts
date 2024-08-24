import { IBook } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';
import { EXCHANGE_BOOK } from '../../exchanges';
import { QUEUE_LIBRARY_OPTIONS } from '../queue.options';

type BookCreateRequest = Pick<IBook, 'title' | 'description' | 'language' | 'publicationDate'> & { authorId: string };

export namespace CreateBookContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_BOOK,
    routingKey: `${EXCHANGE_BOOK.name}-create`,
    queue: `${EXCHANGE_BOOK.name}-create`,
    queueOptions: QUEUE_LIBRARY_OPTIONS.queueOptions,
  };

  export type request = AmqpBaseRequest<BookCreateRequest>;

  export type response = AmqpBaseResponse<IBook>;
}
