import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

import { CreateUserDto } from '../domain/dto/create-user.dto';
import { UserAggregate } from '../domain/user.aggregate';
import { CreateUserCommand, CreateUserCommandHandler } from './commands';
import { GetUserQuery, GetUserQueryHandler } from './queries';

@Injectable()
export class UserFacade {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  public commands = {
    createUser: (user: CreateUserDto) => this.createUser(user),
  };

  public queries = {
    getUser: (userId: string) => this.getUser(userId),
  };

  public events = {};

  private async createUser(user: CreateUserDto): Promise<UserAggregate> {
    const dto = new CreateUserDto(user);
    return await this.commandBus.execute<
      CreateUserCommand,
      Awaited<ReturnType<CreateUserCommandHandler['execute']>>
    >(new CreateUserCommand(dto));
  }

  private async getUser(userId: string): Promise<UserAggregate> {
    return await this.queryBus.execute<
      GetUserQuery,
      Awaited<ReturnType<GetUserQueryHandler['execute']>>
    >(new GetUserQuery(userId));
  }
}
