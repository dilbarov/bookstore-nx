import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { BookFacade } from '../application-services';

export const bookFacadeFactory = (commandBus: CommandBus, queryBus: QueryBus, eventBus: EventBus): BookFacade =>
  new BookFacade(commandBus, queryBus, eventBus);
