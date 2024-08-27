import { ThemeContext } from '../contexts/theme/theme-context';
import { RouterProvider } from 'react-router-dom';
import { router } from '../router/router';
import { SnackbarProvider } from 'notistack';
import { APP_NAME } from '../globals/contants';
import { Helmet } from 'react-helmet';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { graphQLClient } from '../graphql/client';

export const App = () => (
  <ApolloProvider client={graphQLClient}>
    <ThemeContext>
      <Helmet title={APP_NAME} />
      <SnackbarProvider maxSnack={5}>
        <RouterProvider router={router} />{' '}
      </SnackbarProvider>
    </ThemeContext>
  </ApolloProvider>
);
