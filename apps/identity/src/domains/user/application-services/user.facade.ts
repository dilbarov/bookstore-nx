import { CreateUserDto } from '@bookstore-nx/entities';
import { IBaseFacade } from '@bookstore-nx/microservices';
import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

import { UserAggregate } from '../domain/user.aggregate';
import { CreateUserCommand } from './commands';
import { GetUserByEmailQuery, GetUserByIdQuery } from './queries';

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
    return await this.commandBus.execute(new CreateUserCommand(dto));
  }

  private async getUserById(userId: string): Promise<UserAggregate> {
    return await this.queryBus.execute(new GetUserByIdQuery(userId));
  }

  private async getUserByEmail(email: string): Promise<UserAggregate> {
    return await this.queryBus.execute(new GetUserByEmailQuery(email));
  }
}
