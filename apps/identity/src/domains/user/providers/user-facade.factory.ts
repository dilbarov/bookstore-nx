import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

import { UserFacade } from '../application-services';

export const userFacadeFactory = (
  commandBus: CommandBus,
  queryBus: QueryBus,
  eventBus: EventBus,
): UserFacade => new UserFacade(commandBus, queryBus, eventBus);
