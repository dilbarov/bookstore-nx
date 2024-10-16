import { Module } from '@nestjs/common';

import { JwtStrategy } from '../shared/strategies/jwt.strategy';
import { AuthApiModule } from './auth/auth-api.module';
import { AuthorApiModule } from './author/author-api.module';
import { BookApiModule } from './book/book-api.module';
import { FavoriteApiModule } from './favorite/favorite-api.module';
import { UserApiModule } from './user/user-api.module';

@Module({
  imports: [AuthApiModule, UserApiModule, AuthorApiModule, BookApiModule, FavoriteApiModule],
  providers: [JwtStrategy],
})
export class ApiModule {}
