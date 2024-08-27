import React from 'react';
import { RouteObject } from 'react-router';
import { ErrorBoundary } from '../../components/wrappers/error-boundary';
import { LoginPage } from '../../components/sections/auth/pages/login-page';
import { RoutePaths } from '../routes-paths';
import { AuthLayout } from '../../components/layout/auth-layout/auth.layout';
import { RegistrationPage } from '../../components/sections/auth/pages/registration-page';

export const authRoute: RouteObject = {
  errorElement: <ErrorBoundary />,
  element: <AuthLayout />,
  children: [
    {
      path: RoutePaths.login,
      element: <LoginPage />,
    },
    {
      path: RoutePaths.registration,
      element: <RegistrationPage />,
    },
  ],
};
