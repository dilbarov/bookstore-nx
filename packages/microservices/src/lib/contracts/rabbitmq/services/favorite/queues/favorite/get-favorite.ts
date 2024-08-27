import { IFavorite } from '@bookstore-nx/entities';

import { AmqpBaseRequest, AmqpBaseResponse, QueueDeclaration } from '../../../../base';
import { EXCHANGE_FAVORITE } from '../../exchanges';
import { QUEUE_FAVORITE_OPTIONS } from '../queue.options';

type GetFavoriteRequest = Pick<IFavorite, 'entityId' | 'userId'>;

export namespace GetFavoriteContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_FAVORITE,
    routingKey: `${EXCHANGE_FAVORITE.name}-get-by-primary-keys`,
    queue: `${EXCHANGE_FAVORITE.name}-get-by-primary-keys`,
    queueOptions: QUEUE_FAVORITE_OPTIONS.queueOptions,
  };

  export type request = AmqpBaseRequest<GetFavoriteRequest>;

  export type response = AmqpBaseResponse<IFavorite>;
}
