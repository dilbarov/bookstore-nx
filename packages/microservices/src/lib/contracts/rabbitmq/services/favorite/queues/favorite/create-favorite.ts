import { IFavorite } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';
import { EXCHANGE_FAVORITE } from '../../exchanges';
import { QUEUE_FAVORITE_OPTIONS } from '../queue.options';

export namespace CreateFavoriteContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_FAVORITE,
    routingKey: `${EXCHANGE_FAVORITE.name}-create`,
    queue: `${EXCHANGE_FAVORITE.name}-create`,
    queueOptions: QUEUE_FAVORITE_OPTIONS.queueOptions,
  };

  export type request = AmqpBaseRequest<IFavorite>;

  export type response = AmqpBaseResponse<IFavorite>;
}
