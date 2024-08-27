import { QueueDeclaration } from '../../../base';

export const QUEUE_FAVORITE_OPTIONS: Pick<QueueDeclaration, 'queue' | 'queueOptions'> = {
  queue: 'favorite_queue',
  queueOptions: {
    durable: true,
  },
};
