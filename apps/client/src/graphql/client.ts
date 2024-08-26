import { ApolloClient, InMemoryCache } from '@apollo/client';

export const graphQLCLient = new ApolloClient({
  uri: 'http://localhost:7500/graphql',
  cache: new InMemoryCache(),
});
