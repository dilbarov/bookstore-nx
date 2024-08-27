import { AmqpModule, EXCHANGE_AUTHOR } from '@bookstore-nx/microservices';
import { Module } from '@nestjs/common';

import { AuthorResolver } from './resolvers/author.resolver';
import { AuthorService } from './services/author.service';

@Module({
  imports: [AmqpModule.forRoot([EXCHANGE_AUTHOR])],
  providers: [AuthorResolver, AuthorService],
  exports: [AuthorService],
})
export class AuthorApiModule {}
