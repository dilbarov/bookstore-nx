import { Navigate, RouteObject } from 'react-router-dom';
import React from 'react';
import { RoutePaths } from '../routes-paths';

export const rootRoutes: RouteObject = {
  path: '/',
  element: <Navigate replace to={RoutePaths.books} />,
};
