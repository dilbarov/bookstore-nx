import {
  CreateFavoriteDto,
  DeleteFavoriteDto,
  FavoriteModel,
  IFavoriteQuery,
  UpdateFavoriteDto,
} from '@bookstore-nx/entities';
import {
  AmqpService,
  CreateFavoriteContract,
  DeleteFavoriteContract,
  GetFavoriteContract,
  GetFavoritesContract,
  UpdateFavoriteContract,
} from '@bookstore-nx/microservices';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoriteService {
  public constructor(private readonly amqpService: AmqpService) {}

  public async createFavorite(favorite: CreateFavoriteDto): Promise<FavoriteModel> {
    return await this.amqpService.request<CreateFavoriteContract.request, CreateFavoriteContract.response>(
      CreateFavoriteContract.queue,
      favorite,
    );
  }

  public async updateFavorite(favorite: UpdateFavoriteDto): Promise<FavoriteModel> {
    return await this.amqpService.request<UpdateFavoriteContract.request, UpdateFavoriteContract.response>(
      UpdateFavoriteContract.queue,
      favorite,
    );
  }

  public async deleteFavorite(favorite: DeleteFavoriteDto): Promise<boolean> {
    return await this.amqpService.request<DeleteFavoriteContract.request, DeleteFavoriteContract.response>(
      DeleteFavoriteContract.queue,
      favorite,
    );
  }

  public async getFavorite(userId: string, entityId: string): Promise<FavoriteModel | null> {
    return await this.amqpService.request<GetFavoriteContract.request, GetFavoriteContract.response>(
      GetFavoriteContract.queue,
      { userId, entityId },
    );
  }

  public async getFavorites(query: IFavoriteQuery): Promise<FavoriteModel[]> {
    return await this.amqpService.request<GetFavoritesContract.request, GetFavoritesContract.response>(
      GetFavoritesContract.queue,
      query,
    );
  }
}
