import React from 'react';
import { RouteObject } from 'react-router';
import { NotFoundAlert } from '../../components/shared/errors/not-found-alert';

export const notFoundRoute: RouteObject = {
  path: '*',
  element: <NotFoundAlert />,
};
