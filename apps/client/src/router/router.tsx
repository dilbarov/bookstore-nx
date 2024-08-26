import { appRoutes } from './routes/app.routes';
import { rootRoutes } from './routes/root.routes';
import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { ErrorBoundary } from '../components/wrappers/error-boundary';
import { notFoundRoute } from './routes/not-found.routes';
import { authRoute } from './routes/auth.routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorBoundary />,
    children: [rootRoutes, authRoute, appRoutes, notFoundRoute],
  },
]);
