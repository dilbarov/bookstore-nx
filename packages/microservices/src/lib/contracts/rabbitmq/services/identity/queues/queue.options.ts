import { QueueDeclaration } from '@bookstore-nx/microservices';

export const QUEUE_IDENTITY_OPTIONS: Pick<QueueDeclaration, 'queue' | 'queueOptions'> = {
  queue: 'identity_queue',
  queueOptions: {
    durable: true,
  },
};
