import { useParams } from 'react-router';
import { AuthorModel, BookModel, useGetBookByIdQuery } from '../../../../graphql/graphql';
import React from 'react';
import { useGraphqlError } from '../../../../hooks/use-graphql-error';

export const useBook = () => {
  const params = useParams<{ id: string }>();
  const [isFirstQuery, setIsFirstQuery] = React.useState(true);
  const [book, setBook] = React.useState<BookModel>({
    id: '',
    author: { id: '', name: 'Unknown' } as AuthorModel,
    title: 'Unknown',
    language: 'Unknown',
    description: 'Unknown Unknown Unknown Unknown Unknown Unknown Unknown Unknown Unknown Unknown Unknown Unknown',
    rating: 5,
  } as BookModel);

  const { loading, data, error } = useGetBookByIdQuery({ variables: { id: params.id as string } });

  useGraphqlError(error);

  React.useEffect(() => {
    if (isFirstQuery && loading) {
      setIsFirstQuery(false);
    }
  }, [isFirstQuery, loading]);

  React.useEffect(() => {
    if (data?.getBookById) {
      setBook(data?.getBookById as BookModel);
    }
  }, [data?.getBookById]);

  return { isFirstQuery, loading, book };
};
