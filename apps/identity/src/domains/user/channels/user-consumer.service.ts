import { ArgumentType } from '@bookstore-nx/common';
import {
  AmqpBaseRequest,
  AmqpBaseResponse,
  CreateUserContract,
  GetUserContract,
} from '@bookstore-nx/microservices';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';

import { UserFacade } from '../application-services';
import { UserAggregate } from '../domain/user.aggregate';

@Injectable()
export class UserConsumerService {
  private readonly logger = new Logger(UserConsumerService.name);

  public constructor(private readonly userFacade: UserFacade) {}

  @RabbitRPC({
    exchange: CreateUserContract.queue.exchange.name,
    routingKey: CreateUserContract.queue.routingKey,
    queue: CreateUserContract.queue.queue,
  })
  public async createUser(
    request: CreateUserContract.request,
  ): Promise<CreateUserContract.response> {
    return await this.commandExecute('createUser', request);
  }

  public async getUserById(
    request: GetUserContract.request,
  ): Promise<GetUserContract.response> {
    return await this.queryExecute('getUser', request);
  }

  private async commandExecute<
    TRequest extends AmqpBaseRequest<
      ArgumentType<UserFacade[keyof UserFacade['commands']]>
    >,
    TResponse extends AmqpBaseResponse<
      Awaited<ReturnType<UserFacade[keyof UserFacade['commands']]>>
    >,
  >(
    command: keyof UserFacade['commands'],
    request: TRequest,
  ): Promise<TResponse> {
    const { payload: user, ...rest } = request;
    try {
      const payload: UserAggregate = await this.userFacade.commands[command](
        user,
      );
      return {
        ...rest,
        payload,
      } as unknown as TResponse;
    } catch (error) {
      this.logger.error(error);
      return {
        ...rest,
        payload: null,
        error: {
          code: error?.message || 'error',
          message: error?.message || JSON.stringify(error),
        },
      } as unknown as TResponse;
    }
  }

  private async queryExecute<
    TRequest extends AmqpBaseRequest<
      ArgumentType<UserFacade[keyof UserFacade['queries']]>
    >,
    TResponse extends AmqpBaseResponse<
      Awaited<ReturnType<UserFacade[keyof UserFacade['queries']]>>
    >,
  >(query: keyof UserFacade['queries'], request: TRequest): Promise<TResponse> {
    const { payload: user, ...rest } = request;
    try {
      const payload: UserAggregate = await this.userFacade.queries[query](user);
      return {
        ...rest,
        payload,
      } as unknown as TResponse;
    } catch (error) {
      this.logger.error(error);
      return {
        ...rest,
        payload: null,
        error: {
          code: error?.message || 'error',
          message: error?.message || JSON.stringify(error),
        },
      } as unknown as TResponse;
    }
  }
}
