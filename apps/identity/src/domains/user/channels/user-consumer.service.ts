import { CreateUserContract, execute, GetUserByEmailContract, GetUserByIdContract } from '@bookstore-nx/microservices';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { UserFacade } from '../application-services';

@Injectable()
export class UserConsumerService {
  public constructor(private readonly userFacade: UserFacade) {}

  @RabbitRPC({
    exchange: CreateUserContract.queue.exchange.name,
    routingKey: CreateUserContract.queue.routingKey,
    queue: CreateUserContract.queue.queue,
  })
  public async createUser(request: CreateUserContract.request): Promise<CreateUserContract.response> {
    return await execute<CreateUserContract.request['payload'], CreateUserContract.response['payload']>(
      request,
      async user => await this.userFacade.commands.createUser(user),
    );
  }

  @RabbitRPC({
    exchange: GetUserByIdContract.queue.exchange.name,
    routingKey: GetUserByIdContract.queue.routingKey,
    queue: GetUserByIdContract.queue.queue,
  })
  public async getUserById(request: GetUserByIdContract.request): Promise<GetUserByIdContract.response> {
    return await execute<GetUserByIdContract.request['payload'], GetUserByIdContract.response['payload']>(
      request,
      async userId => await this.userFacade.queries.getUserById(userId),
    );
  }

  @RabbitRPC({
    exchange: GetUserByEmailContract.queue.exchange.name,
    routingKey: GetUserByEmailContract.queue.routingKey,
    queue: GetUserByEmailContract.queue.queue,
  })
  public async getUserByEmail(request: GetUserByEmailContract.request): Promise<GetUserByEmailContract.response> {
    return await execute<GetUserByEmailContract.request['payload'], GetUserByEmailContract.response['payload']>(
      request,
      async email => await this.userFacade.queries.getUserByEmail(email),
    );
  }
}
