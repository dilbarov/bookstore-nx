import React from 'react';
import { RouteObject } from 'react-router';
import { ErrorBoundary } from '../../components/wrappers/error-boundary';

export const authRoute: RouteObject = {
  errorElement: <ErrorBoundary />,
  children: [
    // {
    //   path: RoutePaths.login,
    //   element: <LoginPage />,
    // },
    // {
    //   path: RoutePaths.registration,
    //   element: <RegistrationPage />,
    // },
  ],
};
