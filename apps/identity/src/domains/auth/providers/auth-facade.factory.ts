import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

import { AuthFacade } from '../application-services';

export const authFacadeFactory = (commandBus: CommandBus, queryBus: QueryBus, eventBus: EventBus): AuthFacade =>
  new AuthFacade(commandBus, queryBus, eventBus);
