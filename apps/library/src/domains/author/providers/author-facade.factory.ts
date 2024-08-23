import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { AuthorFacade } from '../application-services';

export const authorFacadeFactory = (commandBus: CommandBus, queryBus: QueryBus, eventBus: EventBus): AuthorFacade =>
  new AuthorFacade(commandBus, queryBus, eventBus);
