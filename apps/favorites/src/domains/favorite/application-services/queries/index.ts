import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

import { GetFavoriteQueryHandler } from './get-favorite/get-favorite.query-handler';
import { GetFavoritesQueryHandler } from './get-favorites/get-favorites.query-handler';

export * from './get-favorite/get-favorite.query';
export * from './get-favorite/get-favorite.query-handler';
export * from './get-favorites/get-favorites.query';
export * from './get-favorites/get-favorites.query-handler';

export const FAVORITE_QUERIES_HANDLERS: Type<IQueryHandler>[] = [GetFavoriteQueryHandler, GetFavoritesQueryHandler];
