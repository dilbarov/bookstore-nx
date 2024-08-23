import { QueueDeclaration } from '@bookstore-nx/microservices';

export const QUEUE_BOOKS_OPTIONS: Pick<QueueDeclaration, 'queue' | 'queueOptions'> = {
  queue: 'books_queue',
  queueOptions: {
    durable: true,
  },
};
