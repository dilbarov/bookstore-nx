import { Global, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  FAVORITE_COMMANDS_HANDLERS,
  FAVORITE_EVENTS_HANDLERS,
  FAVORITE_QUERIES_HANDLERS,
  FavoriteFacade,
} from './application-services';
import { FavoriteChannelsModule } from './channels/favorite-channels.module';
import { FavoriteEntity } from './entities/favorite.entity';
import { FavoriteAdapter } from './providers/favorite.adapter';
import { FavoriteRepository } from './providers/favorite.repository';
import { favoriteFacadeFactory } from './providers/favorite-facade.factory';

@Global()
@Module({
  imports: [CqrsModule, FavoriteChannelsModule, TypeOrmModule.forFeature([FavoriteEntity])],
  providers: [
    {
      provide: FavoriteRepository,
      useClass: FavoriteAdapter,
    },
    {
      provide: FavoriteFacade,
      inject: [CommandBus, QueryBus, EventBus],
      useFactory: favoriteFacadeFactory,
    },
    ...FAVORITE_COMMANDS_HANDLERS,
    ...FAVORITE_QUERIES_HANDLERS,
    ...FAVORITE_EVENTS_HANDLERS,
  ],
  exports: [FavoriteFacade, FavoriteRepository],
})
export class FavoriteModule implements OnModuleInit {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  public onModuleInit(): void {
    this.commandBus.register(FAVORITE_COMMANDS_HANDLERS);
    this.queryBus.register(FAVORITE_QUERIES_HANDLERS);
    this.eventBus.register(FAVORITE_EVENTS_HANDLERS);
  }
}
