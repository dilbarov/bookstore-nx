import { IBaseFacade } from '@bookstore-nx/microservices';
import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class BookFacade implements IBaseFacade {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  public commands = {};

  public queries = {};

  public events = {};
}
