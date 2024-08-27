import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

import { CreateFavoriteCommandHandler } from './create-favorite/create-favorite.command-handler';
import { DeleteFavoriteCommandHandler } from './delete-favorite/delete-favorite.command-handler';
import { UpdateFavoriteCommandHandler } from './update-favorite/update-favorite.command-handler';

export * from './create-favorite/create-favorite.command';
export * from './create-favorite/create-favorite.command-handler';
export * from './delete-favorite/delete-favorite.command';
export * from './delete-favorite/delete-favorite.command-handler';
export * from './update-favorite/update-favorite.command';
export * from './update-favorite/update-favorite.command-handler';

export const FAVORITE_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
  CreateFavoriteCommandHandler,
  UpdateFavoriteCommandHandler,
  DeleteFavoriteCommandHandler,
];
