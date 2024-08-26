import { RouteObject } from 'react-router-dom';
import { AppLayout } from '../../components/layout/app-layout/app.layout';
import { BooksPage } from '../../components/sections/library/pages/books-page/books-page';
import { RoutePaths } from '../routes-paths';
import { BookDetailsDrawer } from '../../components/sections/library/pages/book-details-drawer/book-details-drawer';
import { ErrorBoundary } from '../../components/wrappers/error-boundary';
import { BookDetails } from '../../components/sections/library/pages/book-details-drawer/book-details';

export const appRoutes: RouteObject = {
  path: `/*`,
  element: <AppLayout />,
  children: [
    {
      path: RoutePaths.books,
      element: <BooksPage />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: RoutePaths.book,
          element: <BookDetailsDrawer />,
          children: [
            {
              path: '',
              element: <BookDetails />,
              errorElement: <ErrorBoundary />,
            },
          ],
        },
      ],
    },
  ],
};
