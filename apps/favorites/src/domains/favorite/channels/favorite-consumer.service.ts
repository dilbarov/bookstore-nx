import {
  CreateFavoriteContract,
  DeleteFavoriteContract,
  execute,
  GetFavoriteContract,
  GetFavoritesContract,
  UpdateFavoriteContract,
} from '@bookstore-nx/microservices';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { FavoriteFacade } from '../application-services';

@Injectable()
export class FavoriteConsumerService {
  public constructor(private readonly favoriteFacade: FavoriteFacade) {}

  @RabbitRPC({
    exchange: CreateFavoriteContract.queue.exchange.name,
    routingKey: CreateFavoriteContract.queue.routingKey,
    queue: CreateFavoriteContract.queue.queue,
  })
  public async createUser(request: CreateFavoriteContract.request): Promise<CreateFavoriteContract.response> {
    return await execute<CreateFavoriteContract.request, CreateFavoriteContract.response>(
      request,
      async favorite => await this.favoriteFacade.commands.createFavorite(favorite),
    );
  }

  @RabbitRPC({
    exchange: UpdateFavoriteContract.queue.exchange.name,
    routingKey: UpdateFavoriteContract.queue.routingKey,
    queue: UpdateFavoriteContract.queue.queue,
  })
  public async updateFavorite(request: UpdateFavoriteContract.request): Promise<UpdateFavoriteContract.response> {
    return await execute<UpdateFavoriteContract.request, UpdateFavoriteContract.response>(
      request,
      async favorite => await this.favoriteFacade.commands.updateFavorite(favorite),
    );
  }

  @RabbitRPC({
    exchange: DeleteFavoriteContract.queue.exchange.name,
    routingKey: DeleteFavoriteContract.queue.routingKey,
    queue: DeleteFavoriteContract.queue.queue,
  })
  public async deleteFavorite(request: DeleteFavoriteContract.request): Promise<DeleteFavoriteContract.response> {
    return await execute<DeleteFavoriteContract.request, DeleteFavoriteContract.response>(
      request,
      async favorite => await this.favoriteFacade.commands.deleteFavorite(favorite),
    );
  }

  @RabbitRPC({
    exchange: GetFavoritesContract.queue.exchange.name,
    routingKey: GetFavoritesContract.queue.routingKey,
    queue: GetFavoritesContract.queue.queue,
  })
  public async getFavorites(request: GetFavoritesContract.request): Promise<GetFavoritesContract.response> {
    return await execute<GetFavoritesContract.request, GetFavoritesContract.response>(
      request,
      async query => await this.favoriteFacade.queries.getFavorites(query),
    );
  }

  @RabbitRPC({
    exchange: GetFavoriteContract.queue.exchange.name,
    routingKey: GetFavoriteContract.queue.routingKey,
    queue: GetFavoriteContract.queue.queue,
  })
  public async getFavorite(request: GetFavoriteContract.request): Promise<GetFavoriteContract.response> {
    return await execute<GetFavoriteContract.request, GetFavoriteContract.response>(
      request,
      async primaryKeys => await this.favoriteFacade.queries.getFavorite(primaryKeys.userId, primaryKeys.entityId),
    );
  }
}
