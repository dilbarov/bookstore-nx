import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

import { FavoriteFacade } from '../application-services';

export const favoriteFacadeFactory = (commandBus: CommandBus, queryBus: QueryBus, eventBus: EventBus): FavoriteFacade =>
  new FavoriteFacade(commandBus, queryBus, eventBus);
