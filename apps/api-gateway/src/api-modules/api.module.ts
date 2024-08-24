import { Module } from '@nestjs/common';
import { AuthApiModule } from './auth/auth-api.module';
import { UserApiModule } from './user/user-api.module';
import { JwtStrategy } from '../shared/strategies/jwt.strategy';
import { AuthorApiModule } from './author/author-api.module';
import { BookApiModule } from './book/book-api.module';

@Module({
  imports: [AuthApiModule, UserApiModule, AuthorApiModule, BookApiModule],
  providers: [JwtStrategy],
})
export class ApiModule {}
