import React from 'react';
import { useRouteError } from 'react-router-dom';
import { ApolloError } from '@apollo/client';
import { Alert } from '@mui/joy';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export const ErrorBoundary: React.FC = () => {
  const errors = useRouteError() as ApolloError;
  const error = errors.graphQLErrors[0];

  switch (error.extensions?.statusCode) {
    case 400:
      return (
        <Alert variant={'soft'} color={'warning'} size={'lg'} startDecorator={<SentimentVeryDissatisfiedIcon />}>
          Bad request
        </Alert>
      );
    case 401:
      return (
        <Alert variant={'soft'} color={'warning'} size={'lg'} startDecorator={<SentimentVeryDissatisfiedIcon />}>
          Unauthorized
        </Alert>
      );
    case 403:
      return (
        <Alert variant={'soft'} color={'danger'} size={'lg'} startDecorator={<SentimentVeryDissatisfiedIcon />}>
          Forbidden
        </Alert>
      );
    case 404:
      return (
        <Alert variant={'soft'} color={'danger'} size={'lg'} startDecorator={<SentimentVeryDissatisfiedIcon />}>
          Not Found
        </Alert>
      );
    case 500:
      return (
        <Alert variant={'soft'} color={'danger'} size={'lg'} startDecorator={<SentimentVeryDissatisfiedIcon />}>
          Internal Server Error
        </Alert>
      );
    default:
      return (
        <Alert variant={'soft'} color={'danger'} size={'lg'} startDecorator={<SentimentVeryDissatisfiedIcon />}>
          An unexpected error occurred
        </Alert>
      );
  }
};
