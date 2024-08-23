import { Module } from '@nestjs/common';
import { UserResolver } from './user/user.resolver';
import { AmqpModule, EXCHANGE_AUTH, EXCHANGE_USER } from '@bookstore-nx/microservices';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AuthResolver } from './auth/auth.resolver';

@Module({
  imports: [AmqpModule.forRoot([EXCHANGE_AUTH, EXCHANGE_USER])],
  providers: [AuthResolver, UserResolver, JwtStrategy],
})
export class ResolversModule {}
