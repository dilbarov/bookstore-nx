import { IFavorite } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';
import { EXCHANGE_FAVORITE } from '../../exchanges';
import { QUEUE_FAVORITE_OPTIONS } from '../queue.options';

type FavoriteUpdateRequest = Pick<IFavorite, 'entityId' | 'userId' | 'category'>;

export namespace UpdateFavoriteContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_FAVORITE,
    routingKey: `${EXCHANGE_FAVORITE.name}-update`,
    queue: `${EXCHANGE_FAVORITE.name}-update`,
    queueOptions: QUEUE_FAVORITE_OPTIONS.queueOptions,
  };

  export type request = AmqpBaseRequest<FavoriteUpdateRequest>;

  export type response = AmqpBaseResponse<IFavorite>;
}
