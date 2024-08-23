import {
  execute,
  LoginContract,
  LogoutContract,
  RefreshTokensContract,
  RegisterContract,
} from '@bookstore-nx/microservices';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { AuthFacade } from '../application-services';

@Injectable()
export class AuthConsumerService {
  public constructor(private readonly authFacade: AuthFacade) {}

  @RabbitRPC({
    exchange: LoginContract.queue.exchange.name,
    routingKey: LoginContract.queue.routingKey,
    queue: LoginContract.queue.queue,
  })
  public async login(request: LoginContract.request): Promise<LoginContract.response> {
    return await execute<LoginContract.request['payload'], LoginContract.response['payload']>(
      request,
      async payload => await this.authFacade.commands.login(payload),
    );
  }

  @RabbitRPC({
    exchange: RegisterContract.queue.exchange.name,
    routingKey: RegisterContract.queue.routingKey,
    queue: RegisterContract.queue.queue,
  })
  public async register(request: RegisterContract.request): Promise<RegisterContract.response> {
    return await execute<RegisterContract.request['payload'], RegisterContract.response['payload']>(
      request,
      async payload => await this.authFacade.commands.register(payload),
    );
  }

  @RabbitRPC({
    exchange: LogoutContract.queue.exchange.name,
    routingKey: LogoutContract.queue.routingKey,
    queue: LogoutContract.queue.queue,
  })
  public async logout(request: LogoutContract.request): Promise<LogoutContract.response> {
    return await execute<LogoutContract.request['payload'], LogoutContract.response['payload']>(
      request,
      async payload => await this.authFacade.commands.logout(payload),
    );
  }

  @RabbitRPC({
    exchange: RefreshTokensContract.queue.exchange.name,
    routingKey: RefreshTokensContract.queue.routingKey,
    queue: RefreshTokensContract.queue.queue,
  })
  public async refreshTokens(request: RefreshTokensContract.request): Promise<RefreshTokensContract.response> {
    return await execute<RefreshTokensContract.request['payload'], RefreshTokensContract.response['payload']>(
      request,
      async payload => await this.authFacade.commands.refreshTokens(payload),
    );
  }
}
