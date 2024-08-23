import { QueueDeclaration } from '../../../base';

export const QUEUE_LIBRARY_OPTIONS: Pick<QueueDeclaration, 'queue' | 'queueOptions'> = {
  queue: 'library_queue',
  queueOptions: {
    durable: true,
  },
};
