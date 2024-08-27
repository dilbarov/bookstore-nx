import { IFavoriteQuery } from '@bookstore-nx/entities';

export class GetFavoritesQuery {
  public constructor(public readonly query: IFavoriteQuery) {}
}
