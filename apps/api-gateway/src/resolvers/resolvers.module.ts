import { Module } from '@nestjs/common';
import { UserResolver } from './user/user.resolver';
import { AmqpModule, EXCHANGE_AUTH, EXCHANGE_AUTHOR, EXCHANGE_BOOK, EXCHANGE_USER } from '@bookstore-nx/microservices';
import { JwtStrategy } from '../shared/strategies/jwt.strategy';
import { AuthResolver } from './auth/auth.resolver';
import { BookResolver } from './book/book.resolver';
import { AuthorResolver } from './author/author.resolver';

@Module({
  imports: [AmqpModule.forRoot([EXCHANGE_AUTH, EXCHANGE_USER, EXCHANGE_BOOK, EXCHANGE_AUTHOR])],
  providers: [AuthResolver, UserResolver, BookResolver, AuthorResolver, JwtStrategy],
})
export class ResolversModule {}
