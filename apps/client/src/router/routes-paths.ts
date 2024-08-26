import { RouteNames } from './routes-names';

export const RoutePaths = {
  login: `/${RouteNames.login}`,
  registration: `/${RouteNames.registration}`,
  books: `${RouteNames.library}/books`,
  book: `${RouteNames.library}/books/:id`,
  favorites: `/${RouteNames.favorites}`,
};
