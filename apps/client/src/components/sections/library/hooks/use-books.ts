import React from 'react';
import { AuthorModel, BookResponse, FavoriteBookCategory, useGetBooksQuery } from '../../../../graphql/graphql';

export interface Filters {
  authors?: Array<Pick<AuthorModel, 'id' | 'name'>>;
  categories?: FavoriteBookCategory[];
}

export const useBooks = (query: Filters = {}) => {
  const [search, setSearch] = React.useState('');
  const [pendingSearch, setPendingSearch] = React.useState('');
  const [isFirstQuery, setIsFirstQuery] = React.useState(true);
  const { loading, data } = useGetBooksQuery({
    variables: {
      query: {
        search: pendingSearch,
        authors: query.authors?.map(item => item.id),
        categories: query.categories,
        orderBy: 'title',
        orderDirection: 'DESC',
      },
    },
  });
  const [items, setItems] = React.useState<BookResponse[]>([]);
  const searchTimeout = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    if (isFirstQuery && loading) {
      setIsFirstQuery(false);
    }
  }, [isFirstQuery, loading]);

  React.useEffect(() => {
    if (data?.getBooks?.items) {
      setItems(data.getBooks.items as BookResponse[]);
    }
  }, [data?.getBooks?.items]);

  React.useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  const onSearchChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = window.setTimeout(() => {
      setPendingSearch(value);
    }, 300);
  }, []);

  return { search, onSearchChange, isFirstQuery, loading, items };
};
