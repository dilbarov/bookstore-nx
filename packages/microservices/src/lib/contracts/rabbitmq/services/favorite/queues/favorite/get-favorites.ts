import { IFavorite, IFavoriteQuery } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';
import { EXCHANGE_FAVORITE } from '../../exchanges';
import { QUEUE_FAVORITE_OPTIONS } from '../queue.options';

export namespace GetFavoritesContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_FAVORITE,
    routingKey: `${EXCHANGE_FAVORITE.name}-get-by-query`,
    queue: `${EXCHANGE_FAVORITE.name}-get-by-query`,
    queueOptions: QUEUE_FAVORITE_OPTIONS.queueOptions,
  };

  export type request = AmqpBaseRequest<IFavoriteQuery>;

  export type response = AmqpBaseResponse<IFavorite[]>;
}
