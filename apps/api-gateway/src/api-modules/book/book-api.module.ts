import { AmqpModule, EXCHANGE_BOOK } from '@bookstore-nx/microservices';
import { Module } from '@nestjs/common';

import { FavoriteApiModule } from '../favorite/favorite-api.module';
import { BookResolver } from './resolvers/book.resolver';
import { BookService } from './services/book.service';

@Module({
  imports: [AmqpModule.forRoot([EXCHANGE_BOOK]), FavoriteApiModule],
  providers: [BookResolver, BookService],
  exports: [BookService],
})
export class BookApiModule {}
