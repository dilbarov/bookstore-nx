import { AmqpModule, EnvironmentsModule, FAVORITE_EXCHANGES, TypeormModule } from '@bookstore-nx/microservices';
import { Module } from '@nestjs/common';

import { DomainsModule } from '../domains/domains.module';
import { FavoriteEntity } from '../domains/favorite/entities/favorite.entity';
import { getPostgresConfig } from '../helpers/get-postgres-config';

@Module({
  imports: [
    EnvironmentsModule,
    AmqpModule.forRoot(FAVORITE_EXCHANGES),
    TypeormModule.forRoot({
      entities: [FavoriteEntity],
      getConfig: getPostgresConfig,
    }),
    DomainsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
