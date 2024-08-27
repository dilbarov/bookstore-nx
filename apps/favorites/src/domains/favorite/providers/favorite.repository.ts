import { IFavorite, IFavoriteQuery } from '@bookstore-nx/entities';

import { FavoriteAggregate } from '../domain/favorite.aggregate';

export abstract class FavoriteRepository {
  public abstract create(favorite: IFavorite): Promise<FavoriteAggregate>;

  public abstract update(favorite: Pick<IFavorite, 'userId' | 'entityId' | 'category'>): Promise<FavoriteAggregate>;

  public abstract delete(favorite: Pick<IFavorite, 'userId' | 'entityId'>): Promise<void>;

  public abstract findAll(query: IFavoriteQuery): Promise<FavoriteAggregate[]>;

  public abstract findOne(userId: string, entityId: string): Promise<FavoriteAggregate>;
}
