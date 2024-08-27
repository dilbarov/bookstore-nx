import { AmqpModule, EXCHANGE_AUTH } from '@bookstore-nx/microservices';
import { Module } from '@nestjs/common';

import { AuthResolver } from './resolvers/auth.resolver';
import { AuthService } from './services/auth.service';

@Module({
  imports: [AmqpModule.forRoot([EXCHANGE_AUTH])],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthApiModule {}
