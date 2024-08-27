import { IFavorite } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';
import { EXCHANGE_FAVORITE } from '../../exchanges';
import { QUEUE_FAVORITE_OPTIONS } from '../queue.options';

type FavoriteDeleteRequest = Pick<IFavorite, 'entityId' | 'userId'>;

export namespace DeleteFavoriteContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_FAVORITE,
    routingKey: `${EXCHANGE_FAVORITE.name}-delete`,
    queue: `${EXCHANGE_FAVORITE.name}-delete`,
    queueOptions: QUEUE_FAVORITE_OPTIONS.queueOptions,
  };

  export type request = AmqpBaseRequest<FavoriteDeleteRequest>;

  export type response = AmqpBaseResponse<boolean>;
}
