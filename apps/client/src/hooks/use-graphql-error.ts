import { ApolloError } from '@apollo/client';
import React from 'react';

export const useGraphqlError = (error?: ApolloError) => {
  React.useEffect(() => {
    if (error) {
      throw new ApolloError(error);
    }
  }, [error]);
};
