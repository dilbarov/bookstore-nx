import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RefreshTokensDocument, RefreshTokensMutation, RefreshTokensMutationVariables, TokensDto } from './graphql';
import { getVisitorId } from '../globals/helpers/fingerprint';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: 'http://localhost:7500/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }

  return { headers };
});

const refreshTokens = async (refreshToken: string, fingerprint: string): Promise<TokensDto> => {
  const { data } = await graphQLClient.mutate<RefreshTokensMutation, RefreshTokensMutationVariables>({
    mutation: RefreshTokensDocument,
    variables: {
      refreshToken,
      fingerprint,
    },
  });

  if (!data) {
    throw new Error('Failed to refresh tokens');
  }
  const result = data.refreshTokens;
  localStorage.setItem('accessToken', result.accessToken);
  localStorage.setItem('refreshToken', result.refreshToken);

  return result;
};

const generateRefreshTokenLinkOnUnauthError = () => {
  return [
    onError(({ graphQLErrors, operation, forward }) => {
      if (!graphQLErrors) return;

      for (const { path, extensions } of graphQLErrors) {
        if (extensions?.code !== 'UNAUTHENTICATED' || !path) continue;
        if (path.includes('refreshTokens')) break;

        const { getContext, setContext } = operation;
        const context = getContext();

        setContext({
          ...context,
          headers: {
            ...context?.headers,
            _needsRefresh: true,
          },
        });

        return forward(operation);
      }
    }),
    setContext(async (_, previousContext) => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (previousContext?.headers?._needsRefresh && refreshToken) {
        const fingerprint = await getVisitorId();
        await refreshTokens(refreshToken, fingerprint);
      }

      return previousContext;
    }),
  ];
};

export const graphQLClient = new ApolloClient({
  link: ApolloLink.from([...generateRefreshTokenLinkOnUnauthError(), authLink, httpLink]),
  cache: new InMemoryCache(),
});
