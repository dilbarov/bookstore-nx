import { Global, Module } from '@nestjs/common';

import { FavoriteModule } from './favorite/favorite.module';

@Global()
@Module({
  imports: [FavoriteModule],
  providers: [],
})
export class DomainsModule {}
