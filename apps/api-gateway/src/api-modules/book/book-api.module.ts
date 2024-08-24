import { Module } from '@nestjs/common';
import { BookResolver } from './resolvers/book.resolver';
import { BookService } from './services/book.service';
import { AmqpModule, EXCHANGE_BOOK } from '@bookstore-nx/microservices';

@Module({
  imports: [AmqpModule.forRoot([EXCHANGE_BOOK])],
  providers: [BookResolver, BookService],
})
export class BookApiModule {}
