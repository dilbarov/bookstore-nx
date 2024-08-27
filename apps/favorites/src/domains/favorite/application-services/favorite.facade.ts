import { CreateFavoriteDto, DeleteFavoriteDto, IFavoriteQuery, UpdateFavoriteDto } from '@bookstore-nx/entities';
import { IBaseFacade } from '@bookstore-nx/microservices';
import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

import { FavoriteAggregate } from '../domain/favorite.aggregate';
import { CreateFavoriteCommand, DeleteFavoriteCommand, UpdateFavoriteCommand } from './commands';
import { GetFavoriteQuery, GetFavoritesQuery } from './queries';

@Injectable()
export class FavoriteFacade implements IBaseFacade {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  public commands = {
    createFavorite: (favorite: CreateFavoriteDto) => this.createFavorite(favorite),
    updateFavorite: (favorite: UpdateFavoriteDto) => this.updateFavorite(favorite),
    deleteFavorite: (favorite: DeleteFavoriteDto) => this.deleteFavorite(favorite),
  };
  public queries = {
    getFavorite: (entityId: string, userId: string) => this.getFavorite(entityId, userId),
    getFavorites: (query: IFavoriteQuery) => this.getFavorites(query),
  };
  public events = {};

  private async createFavorite(favorite: CreateFavoriteDto): Promise<FavoriteAggregate> {
    return await this.commandBus.execute(new CreateFavoriteCommand(favorite));
  }

  private async updateFavorite(favorite: UpdateFavoriteDto): Promise<FavoriteAggregate> {
    return await this.commandBus.execute(new UpdateFavoriteCommand(favorite));
  }

  private async deleteFavorite(favorite: DeleteFavoriteDto): Promise<boolean> {
    await this.commandBus.execute(new DeleteFavoriteCommand(favorite));
    return true;
  }

  private async getFavorite(entityId: string, userId: string): Promise<FavoriteAggregate> {
    return await this.queryBus.execute(new GetFavoriteQuery(entityId, userId));
  }

  private async getFavorites(query: IFavoriteQuery): Promise<FavoriteAggregate[]> {
    return await this.queryBus.execute(new GetFavoritesQuery(query));
  }
}
