import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FavoriteAggregate } from '../../../domain/favorite.aggregate';
import { FavoriteRepository } from '../../../providers/favorite.repository';
import { GetFavoriteQuery } from './get-favorite.query';

@QueryHandler(GetFavoriteQuery)
export class GetFavoriteQueryHandler implements IQueryHandler<GetFavoriteQuery, FavoriteAggregate> {
  public constructor(private readonly favoriteRepository: FavoriteRepository) {}

  public async execute({ userId, entityId }: GetFavoriteQuery): Promise<FavoriteAggregate> {
    return await this.favoriteRepository.findOne(userId, entityId);
  }
}
