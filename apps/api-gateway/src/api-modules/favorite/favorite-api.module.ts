import { AmqpModule, EXCHANGE_FAVORITE } from '@bookstore-nx/microservices';
import { Module } from '@nestjs/common';

import { FavoriteResolver } from './resolvers/favorite.resolver';
import { FavoriteService } from './services/favorite.service';

@Module({
  imports: [AmqpModule.forRoot([EXCHANGE_FAVORITE])],
  providers: [FavoriteResolver, FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteApiModule {}
