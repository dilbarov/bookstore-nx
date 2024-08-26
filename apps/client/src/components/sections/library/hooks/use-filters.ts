import { AuthorModel, useGetAuthorsQuery } from '../../../../graphql/graphql';
import React from 'react';
import { Filters } from './use-books';

export const useFilters = () => {
  const { data } = useGetAuthorsQuery({ variables: { query: {} } });
  const [authors, setAuthors] = React.useState<AuthorModel[]>([]);

  const [filters, setFilters] = React.useState<Filters>({ authors: [] });

  const isDefaultFilters = React.useMemo(() => {
    return filters.authors?.length === 0;
  }, [filters?.authors]);

  React.useEffect(() => {
    if (data?.getAuthors?.items) {
      setAuthors(data.getAuthors.items as AuthorModel[]);
    }
  }, [data?.getAuthors?.items]);

  const onFiltersChange = React.useCallback((_filters: Filters) => {
    setFilters(() => _filters);
  }, []);

  return {
    authors,
    isDefaultFilters,
    filters,
    onFiltersChange,
  };
};
