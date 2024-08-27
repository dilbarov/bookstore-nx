import { FavoriteModel, IFavorite, validateAggregationModel } from '@bookstore-nx/entities';

export class FavoriteAggregate extends FavoriteModel {
  private constructor() {
    super();
  }

  public static create(favorite: Partial<IFavorite>): FavoriteAggregate {
    const _favorite = new FavoriteAggregate();
    Object.assign(_favorite, favorite);

    validateAggregationModel(_favorite);

    return _favorite;
  }
}
