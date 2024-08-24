import { Module } from '@nestjs/common';
import { AuthorResolver } from './resolvers/author.resolver';
import { AuthorService } from './services/author.service';
import { AmqpModule, EXCHANGE_AUTHOR } from '@bookstore-nx/microservices';

@Module({
  imports: [AmqpModule.forRoot([EXCHANGE_AUTHOR])],
  providers: [AuthorResolver, AuthorService],
})
export class AuthorApiModule {}
