import { CreateFavoriteDto, DeleteFavoriteDto, FavoriteModel, UpdateFavoriteDto } from '@bookstore-nx/entities';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { FavoriteService } from '../services/favorite.service';

@Resolver(() => FavoriteModel)
export class FavoriteResolver {
  public constructor(private readonly favoriteService: FavoriteService) {}

  @Mutation(() => FavoriteModel)
  public async createFavorite(
    @Args('favorite', { type: () => CreateFavoriteDto }) favorite: CreateFavoriteDto,
  ): Promise<FavoriteModel> {
    return await this.favoriteService.createFavorite(favorite);
  }

  @Mutation(() => FavoriteModel)
  public async updateFavorite(
    @Args('favorite', { type: () => UpdateFavoriteDto }) favorite: UpdateFavoriteDto,
  ): Promise<FavoriteModel> {
    return await this.favoriteService.updateFavorite(favorite);
  }

  @Mutation(() => Boolean)
  public async deleteFavorite(
    @Args('favorite', { type: () => DeleteFavoriteDto }) favorite: DeleteFavoriteDto,
  ): Promise<boolean> {
    return await this.favoriteService.deleteFavorite(favorite);
  }
}
