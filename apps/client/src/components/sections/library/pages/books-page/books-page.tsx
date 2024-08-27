import React from 'react';
import { PageTitle } from '../../../../shared/display/page-title/page-title';
import { Box, CircularProgress, Input, Stack } from '@mui/joy';
import { BooksList } from '../../ui/books-list/books-list';
import SearchIcon from '@mui/icons-material/Search';
import { useBooks } from '../../hooks/use-books';
import { Outlet, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../../../router/routes-paths';
import { FiltersButton } from '../../ui/books-list/filters-button';
import { FiltersDrawer } from '../../ui/books-list/filters-drawer';
import { useFilters } from '../../hooks/use-filters';
import { useFavorite } from '../../hooks/use-favorite';

export const BooksPage: React.FC = () => {
  const { authors, isDefaultFilters, onFiltersChange, filters } = useFilters();
  const { loading, isFirstQuery, items, search, onSearchChange } = useBooks(filters);
  const { createFavorite, updateFavorite, deleteFavorite } = useFavorite();

  const [filtersOpened, setFiltersOpened] = React.useState(false);

  const navigate = useNavigate();

  const handleExplore = React.useCallback(
    (id: string) => {
      navigate(`${RoutePaths.books}/${id}`);
    },
    [navigate],
  );

  const handleOpenFilters = React.useCallback(() => {
    setFiltersOpened(true);
  }, []);

  const handleCloseFilters = React.useCallback(() => {
    setFiltersOpened(false);
  }, []);

  return (
    <Stack spacing={1}>
      <PageTitle title={`Library`} isChildren={false} />
      <Box sx={{ pl: 1, pr: 1 }}>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <Input
            value={search}
            onChange={onSearchChange}
            color={'neutral'}
            variant={'plain'}
            size={'lg'}
            startDecorator={<SearchIcon />}
            endDecorator={search && loading && <CircularProgress size={'sm'} />}
            sx={{ maxWidth: 400 }}
          />
          <FiltersButton onClick={handleOpenFilters} badge={!isDefaultFilters} />
          <FiltersDrawer
            filters={filters}
            onChange={onFiltersChange}
            opened={filtersOpened}
            onClose={handleCloseFilters}
            authors={authors}
          />
        </Stack>
      </Box>
      <BooksList
        loading={isFirstQuery && loading}
        items={items}
        onExplore={handleExplore}
        onAddToFavorites={createFavorite}
        onRemoveFromFavorites={deleteFavorite}
        onChangeFavoriteCategory={updateFavorite}
      />
      <Outlet />
    </Stack>
  );
};
