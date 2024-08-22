import { IBaseFacade } from '@bookstore-nx/microservices';
import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

import { CreateUserDto } from '../domain/dto/create-user.dto';
import { UserAggregate } from '../domain/user.aggregate';
import { CreateUserCommand, CreateUserCommandHandler } from './commands';
import { GetUserByEmailQuery, GetUserByEmailQueryHandler, GetUserByIdQuery, GetUserByIdQueryHandler } from './queries';

@Injectable()
export class UserFacade implements IBaseFacade {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  public commands = {
    createUser: (user: CreateUserDto) => this.createUser(user),
  };

  public queries = {
    getUserById: (userId: string) => this.getUserById(userId),
    getUserByEmail: (email: string) => this.getUserByEmail(email),
  };

  public events = {};

  private async createUser(user: CreateUserDto): Promise<UserAggregate> {
    const dto = new CreateUserDto(user);
    return await this.commandBus.execute<CreateUserCommand, Awaited<ReturnType<CreateUserCommandHandler['execute']>>>(
      new CreateUserCommand(dto),
    );
  }

  private async getUserById(userId: string): Promise<UserAggregate> {
    return await this.queryBus.execute<GetUserByIdQuery, Awaited<ReturnType<GetUserByIdQueryHandler['execute']>>>(
      new GetUserByIdQuery(userId),
    );
  }

  private async getUserByEmail(email: string): Promise<UserAggregate> {
    return await this.queryBus.execute<GetUserByEmailQuery, Awaited<ReturnType<GetUserByEmailQueryHandler['execute']>>>(
      new GetUserByEmailQuery(email),
    );
  }
}
