import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthorModel = {
  __typename?: 'AuthorModel';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type AuthorQueryInput = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type AuthorsResponse = {
  __typename?: 'AuthorsResponse';
  count: Scalars['Int']['output'];
  items: Array<AuthorModel>;
};

export type BookModel = {
  __typename?: 'BookModel';
  author: AuthorModel;
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  language: Scalars['String']['output'];
  rating: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type BookQueryInput = {
  authors?: InputMaybe<Array<Scalars['String']['input']>>;
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  isFavorite?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type BookResponse = {
  __typename?: 'BookResponse';
  author: AuthorModel;
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  favoriteCategory?: Maybe<FavoriteBookCategory>;
  id: Scalars['ID']['output'];
  language: Scalars['String']['output'];
  rating: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type BooksResponse = {
  __typename?: 'BooksResponse';
  count: Scalars['Int']['output'];
  items: Array<BookResponse>;
};

export type CreateAuthorDto = {
  name: Scalars['String']['input'];
};

export type CreateBookDto = {
  authorId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  language: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type CreateFavoriteDto = {
  category: Scalars['String']['input'];
  entityId: Scalars['String']['input'];
  entityType: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type DeleteFavoriteDto = {
  entityId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

/** The category of favorite items */
export enum FavoriteBookCategory {
  DidNotFinish = 'DidNotFinish',
  Read = 'Read',
  ReadingNow = 'ReadingNow',
  WantToRead = 'WantToRead'
}

export type FavoriteModel = {
  __typename?: 'FavoriteModel';
  category: Scalars['String']['output'];
  entityId: Scalars['String']['output'];
  entityType: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAuthor: AuthorModel;
  createBook: BookModel;
  createFavorite: FavoriteModel;
  deleteFavorite: Scalars['Boolean']['output'];
  login: TokensDto;
  logout: Scalars['Boolean']['output'];
  refreshTokens: TokensDto;
  register: TokensDto;
  updateBook: BookModel;
  updateFavorite: FavoriteModel;
};


export type MutationCreateAuthorArgs = {
  author: CreateAuthorDto;
};


export type MutationCreateBookArgs = {
  book: CreateBookDto;
};


export type MutationCreateFavoriteArgs = {
  favorite: CreateFavoriteDto;
};


export type MutationDeleteFavoriteArgs = {
  favorite: DeleteFavoriteDto;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  fingerprint: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationLogoutArgs = {
  fingerprint: Scalars['String']['input'];
};


export type MutationRefreshTokensArgs = {
  fingerprint: Scalars['String']['input'];
  refreshToken: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  fingerprint: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateBookArgs = {
  book: UpdateBookDto;
};


export type MutationUpdateFavoriteArgs = {
  favorite: UpdateFavoriteDto;
};

export type Query = {
  __typename?: 'Query';
  getAuthorById: AuthorModel;
  getAuthors: AuthorsResponse;
  getBookById: BookResponse;
  getBooks: BooksResponse;
  getCurrentUser: UserModel;
  getUserByEmail: UserModel;
  getUserById: UserModel;
};


export type QueryGetAuthorByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetAuthorsArgs = {
  query: AuthorQueryInput;
};


export type QueryGetBookByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetBooksArgs = {
  query: BookQueryInput;
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String']['input'];
};

export type TokensDto = {
  __typename?: 'TokensDto';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type UpdateBookDto = {
  authorId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  language: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type UpdateFavoriteDto = {
  category: Scalars['String']['input'];
  entityId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type UserModel = {
  __typename?: 'UserModel';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  fingerprint: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'TokensDto', accessToken: string, refreshToken: string } };

export type LogoutMutationVariables = Exact<{
  fingerprint: Scalars['String']['input'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RefreshTokensMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
  fingerprint: Scalars['String']['input'];
}>;


export type RefreshTokensMutation = { __typename?: 'Mutation', refreshTokens: { __typename?: 'TokensDto', accessToken: string, refreshToken: string } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  fingerprint: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'TokensDto', accessToken: string, refreshToken: string } };

export type GetAuthorsQueryVariables = Exact<{
  query: AuthorQueryInput;
}>;


export type GetAuthorsQuery = { __typename?: 'Query', getAuthors: { __typename?: 'AuthorsResponse', count: number, items: Array<{ __typename?: 'AuthorModel', id: string, name: string }> } };

export type CreateBookMutationVariables = Exact<{
  book: CreateBookDto;
}>;


export type CreateBookMutation = { __typename?: 'Mutation', createBook: { __typename?: 'BookModel', id: string, title: string, description: string, language: string, url: string, author: { __typename?: 'AuthorModel', id: string, name: string } } };

export type GetBookByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetBookByIdQuery = { __typename?: 'Query', getBookById: { __typename?: 'BookResponse', id: string, title: string, description: string, language: string, rating: number, url: string, favoriteCategory?: FavoriteBookCategory | null, author: { __typename?: 'AuthorModel', id: string, name: string } } };

export type GetBooksQueryVariables = Exact<{
  query: BookQueryInput;
}>;


export type GetBooksQuery = { __typename?: 'Query', getBooks: { __typename?: 'BooksResponse', count: number, items: Array<{ __typename?: 'BookResponse', id: string, title: string, language: string, rating: number, url: string, favoriteCategory?: FavoriteBookCategory | null, author: { __typename?: 'AuthorModel', id: string, name: string } }> } };

export type CreateFavoriteMutationVariables = Exact<{
  favorite: CreateFavoriteDto;
}>;


export type CreateFavoriteMutation = { __typename?: 'Mutation', createFavorite: { __typename?: 'FavoriteModel', entityId: string, category: string, entityType: string } };

export type DeleteFavoriteMutationVariables = Exact<{
  favorite: DeleteFavoriteDto;
}>;


export type DeleteFavoriteMutation = { __typename?: 'Mutation', deleteFavorite: boolean };

export type UpdateFavoriteMutationVariables = Exact<{
  favorite: UpdateFavoriteDto;
}>;


export type UpdateFavoriteMutation = { __typename?: 'Mutation', updateFavorite: { __typename?: 'FavoriteModel', entityId: string, category: string, entityType: string } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'UserModel', id: string, email: string } };


export const LoginDocument = gql`
    mutation Login($email: String!, $fingerprint: String!, $password: String!) {
  login(email: $email, fingerprint: $fingerprint, password: $password) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      fingerprint: // value for 'fingerprint'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout($fingerprint: String!) {
  logout(fingerprint: $fingerprint)
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *      fingerprint: // value for 'fingerprint'
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokensDocument = gql`
    mutation RefreshTokens($refreshToken: String!, $fingerprint: String!) {
  refreshTokens(refreshToken: $refreshToken, fingerprint: $fingerprint) {
    accessToken
    refreshToken
  }
}
    `;
export type RefreshTokensMutationFn = Apollo.MutationFunction<RefreshTokensMutation, RefreshTokensMutationVariables>;

/**
 * __useRefreshTokensMutation__
 *
 * To run a mutation, you first call `useRefreshTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokensMutation, { data, loading, error }] = useRefreshTokensMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *      fingerprint: // value for 'fingerprint'
 *   },
 * });
 */
export function useRefreshTokensMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokensMutation, RefreshTokensMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokensMutation, RefreshTokensMutationVariables>(RefreshTokensDocument, options);
      }
export type RefreshTokensMutationHookResult = ReturnType<typeof useRefreshTokensMutation>;
export type RefreshTokensMutationResult = Apollo.MutationResult<RefreshTokensMutation>;
export type RefreshTokensMutationOptions = Apollo.BaseMutationOptions<RefreshTokensMutation, RefreshTokensMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $fingerprint: String!, $password: String!) {
  register(email: $email, fingerprint: $fingerprint, password: $password) {
    accessToken
    refreshToken
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      fingerprint: // value for 'fingerprint'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetAuthorsDocument = gql`
    query GetAuthors($query: AuthorQueryInput!) {
  getAuthors(query: $query) {
    items {
      id
      name
    }
    count
  }
}
    `;

/**
 * __useGetAuthorsQuery__
 *
 * To run a query within a React component, call `useGetAuthorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetAuthorsQuery(baseOptions: Apollo.QueryHookOptions<GetAuthorsQuery, GetAuthorsQueryVariables> & ({ variables: GetAuthorsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthorsQuery, GetAuthorsQueryVariables>(GetAuthorsDocument, options);
      }
export function useGetAuthorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthorsQuery, GetAuthorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthorsQuery, GetAuthorsQueryVariables>(GetAuthorsDocument, options);
        }
export function useGetAuthorsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAuthorsQuery, GetAuthorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAuthorsQuery, GetAuthorsQueryVariables>(GetAuthorsDocument, options);
        }
export type GetAuthorsQueryHookResult = ReturnType<typeof useGetAuthorsQuery>;
export type GetAuthorsLazyQueryHookResult = ReturnType<typeof useGetAuthorsLazyQuery>;
export type GetAuthorsSuspenseQueryHookResult = ReturnType<typeof useGetAuthorsSuspenseQuery>;
export type GetAuthorsQueryResult = Apollo.QueryResult<GetAuthorsQuery, GetAuthorsQueryVariables>;
export const CreateBookDocument = gql`
    mutation CreateBook($book: CreateBookDto!) {
  createBook(book: $book) {
    id
    title
    description
    language
    url
    author {
      id
      name
    }
  }
}
    `;
export type CreateBookMutationFn = Apollo.MutationFunction<CreateBookMutation, CreateBookMutationVariables>;

/**
 * __useCreateBookMutation__
 *
 * To run a mutation, you first call `useCreateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookMutation, { data, loading, error }] = useCreateBookMutation({
 *   variables: {
 *      book: // value for 'book'
 *   },
 * });
 */
export function useCreateBookMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookMutation, CreateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookMutation, CreateBookMutationVariables>(CreateBookDocument, options);
      }
export type CreateBookMutationHookResult = ReturnType<typeof useCreateBookMutation>;
export type CreateBookMutationResult = Apollo.MutationResult<CreateBookMutation>;
export type CreateBookMutationOptions = Apollo.BaseMutationOptions<CreateBookMutation, CreateBookMutationVariables>;
export const GetBookByIdDocument = gql`
    query GetBookById($id: String!) {
  getBookById(id: $id) {
    id
    title
    description
    language
    rating
    url
    favoriteCategory
    author {
      id
      name
    }
  }
}
    `;

/**
 * __useGetBookByIdQuery__
 *
 * To run a query within a React component, call `useGetBookByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBookByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBookByIdQuery, GetBookByIdQueryVariables> & ({ variables: GetBookByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookByIdQuery, GetBookByIdQueryVariables>(GetBookByIdDocument, options);
      }
export function useGetBookByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookByIdQuery, GetBookByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookByIdQuery, GetBookByIdQueryVariables>(GetBookByIdDocument, options);
        }
export function useGetBookByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBookByIdQuery, GetBookByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBookByIdQuery, GetBookByIdQueryVariables>(GetBookByIdDocument, options);
        }
export type GetBookByIdQueryHookResult = ReturnType<typeof useGetBookByIdQuery>;
export type GetBookByIdLazyQueryHookResult = ReturnType<typeof useGetBookByIdLazyQuery>;
export type GetBookByIdSuspenseQueryHookResult = ReturnType<typeof useGetBookByIdSuspenseQuery>;
export type GetBookByIdQueryResult = Apollo.QueryResult<GetBookByIdQuery, GetBookByIdQueryVariables>;
export const GetBooksDocument = gql`
    query GetBooks($query: BookQueryInput!) {
  getBooks(query: $query) {
    items {
      id
      title
      language
      rating
      url
      favoriteCategory
      author {
        id
        name
      }
    }
    count
  }
}
    `;

/**
 * __useGetBooksQuery__
 *
 * To run a query within a React component, call `useGetBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBooksQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetBooksQuery(baseOptions: Apollo.QueryHookOptions<GetBooksQuery, GetBooksQueryVariables> & ({ variables: GetBooksQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options);
      }
export function useGetBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options);
        }
export function useGetBooksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options);
        }
export type GetBooksQueryHookResult = ReturnType<typeof useGetBooksQuery>;
export type GetBooksLazyQueryHookResult = ReturnType<typeof useGetBooksLazyQuery>;
export type GetBooksSuspenseQueryHookResult = ReturnType<typeof useGetBooksSuspenseQuery>;
export type GetBooksQueryResult = Apollo.QueryResult<GetBooksQuery, GetBooksQueryVariables>;
export const CreateFavoriteDocument = gql`
    mutation CreateFavorite($favorite: CreateFavoriteDto!) {
  createFavorite(favorite: $favorite) {
    entityId
    category
    entityType
  }
}
    `;
export type CreateFavoriteMutationFn = Apollo.MutationFunction<CreateFavoriteMutation, CreateFavoriteMutationVariables>;

/**
 * __useCreateFavoriteMutation__
 *
 * To run a mutation, you first call `useCreateFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFavoriteMutation, { data, loading, error }] = useCreateFavoriteMutation({
 *   variables: {
 *      favorite: // value for 'favorite'
 *   },
 * });
 */
export function useCreateFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<CreateFavoriteMutation, CreateFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFavoriteMutation, CreateFavoriteMutationVariables>(CreateFavoriteDocument, options);
      }
export type CreateFavoriteMutationHookResult = ReturnType<typeof useCreateFavoriteMutation>;
export type CreateFavoriteMutationResult = Apollo.MutationResult<CreateFavoriteMutation>;
export type CreateFavoriteMutationOptions = Apollo.BaseMutationOptions<CreateFavoriteMutation, CreateFavoriteMutationVariables>;
export const DeleteFavoriteDocument = gql`
    mutation DeleteFavorite($favorite: DeleteFavoriteDto!) {
  deleteFavorite(favorite: $favorite)
}
    `;
export type DeleteFavoriteMutationFn = Apollo.MutationFunction<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>;

/**
 * __useDeleteFavoriteMutation__
 *
 * To run a mutation, you first call `useDeleteFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFavoriteMutation, { data, loading, error }] = useDeleteFavoriteMutation({
 *   variables: {
 *      favorite: // value for 'favorite'
 *   },
 * });
 */
export function useDeleteFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>(DeleteFavoriteDocument, options);
      }
export type DeleteFavoriteMutationHookResult = ReturnType<typeof useDeleteFavoriteMutation>;
export type DeleteFavoriteMutationResult = Apollo.MutationResult<DeleteFavoriteMutation>;
export type DeleteFavoriteMutationOptions = Apollo.BaseMutationOptions<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>;
export const UpdateFavoriteDocument = gql`
    mutation UpdateFavorite($favorite: UpdateFavoriteDto!) {
  updateFavorite(favorite: $favorite) {
    entityId
    category
    entityType
  }
}
    `;
export type UpdateFavoriteMutationFn = Apollo.MutationFunction<UpdateFavoriteMutation, UpdateFavoriteMutationVariables>;

/**
 * __useUpdateFavoriteMutation__
 *
 * To run a mutation, you first call `useUpdateFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFavoriteMutation, { data, loading, error }] = useUpdateFavoriteMutation({
 *   variables: {
 *      favorite: // value for 'favorite'
 *   },
 * });
 */
export function useUpdateFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFavoriteMutation, UpdateFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFavoriteMutation, UpdateFavoriteMutationVariables>(UpdateFavoriteDocument, options);
      }
export type UpdateFavoriteMutationHookResult = ReturnType<typeof useUpdateFavoriteMutation>;
export type UpdateFavoriteMutationResult = Apollo.MutationResult<UpdateFavoriteMutation>;
export type UpdateFavoriteMutationOptions = Apollo.BaseMutationOptions<UpdateFavoriteMutation, UpdateFavoriteMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    id
    email
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;