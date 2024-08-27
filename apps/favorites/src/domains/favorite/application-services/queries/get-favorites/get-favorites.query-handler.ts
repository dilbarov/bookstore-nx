import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FavoriteAggregate } from '../../../domain/favorite.aggregate';
import { FavoriteRepository } from '../../../providers/favorite.repository';
import { GetFavoritesQuery } from './get-favorites.query';

@QueryHandler(GetFavoritesQuery)
export class GetFavoritesQueryHandler implements IQueryHandler<GetFavoritesQuery, FavoriteAggregate[]> {
  public constructor(private readonly favoriteRepository: FavoriteRepository) {}

  public async execute({ query }: GetFavoritesQuery): Promise<FavoriteAggregate[]> {
    return await this.favoriteRepository.findAll(query);
  }
}
