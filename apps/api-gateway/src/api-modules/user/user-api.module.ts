import { Module } from '@nestjs/common';
import { AmqpModule, EXCHANGE_USER } from '@bookstore-nx/microservices';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';

@Module({
  imports: [AmqpModule.forRoot([EXCHANGE_USER])],
  providers: [UserResolver, UserService],
})
export class UserApiModule {}
