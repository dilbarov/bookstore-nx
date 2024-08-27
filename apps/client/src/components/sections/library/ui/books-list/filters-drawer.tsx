import React from 'react';
import { AdaptiveDrawer } from '../../../../shared/adaptive/adaptive-drawer';
import { Autocomplete, Button, Checkbox, DialogContent, DialogTitle, Divider, Stack, Typography } from '@mui/joy';
import { Filters } from '../../hooks/use-books';
import { AuthorModel, FavoriteBookCategory } from '../../../../../graphql/graphql';
import { voidFunction } from '../../../../../globals/helpers/void-function';
import { useCurrentUser } from '../../../../../hooks/use-current-user';

type AuthorItem = Pick<AuthorModel, 'id' | 'name'>;

interface Props {
  filters?: Filters;
  authors?: AuthorItem[];
  opened: boolean;
  onClose: () => void;
  onChange?: (filters: Filters) => void;
}

const CATEGORIES: FavoriteBookCategory[] = [
  FavoriteBookCategory.WantToRead,
  FavoriteBookCategory.ReadingNow,
  FavoriteBookCategory.Read,
  FavoriteBookCategory.DidNotFinish,
];

const CATEGORIES_LABELS: Record<FavoriteBookCategory, string> = {
  [FavoriteBookCategory.WantToRead]: 'Want to Read',
  [FavoriteBookCategory.ReadingNow]: 'Reading Now',
  [FavoriteBookCategory.Read]: 'Read',
  [FavoriteBookCategory.DidNotFinish]: 'Did Not Finish',
};

export const FiltersDrawer: React.FC<Props> = ({ opened, onClose, filters, authors = [], onChange = voidFunction }) => {
  const { canManageFavorites } = useCurrentUser();

  const [authorsFilter, setAuthorsFilter] = React.useState<AuthorItem[]>(filters?.authors || []);

  const [categoriesFilter, setCategoriesFilter] = React.useState<FavoriteBookCategory[]>(filters?.categories || []);

  const handleChange = React.useCallback(() => {
    onChange({
      authors: authorsFilter,
      categories: Array.from(categoriesFilter),
    });
    onClose();
  }, [authorsFilter, categoriesFilter, onChange, onClose]);

  return (
    <AdaptiveDrawer opened={opened} onClose={onClose} showCloseButton anchor={'left'}>
      <DialogTitle>Filters</DialogTitle>
      <Divider sx={{ mt: 'auto' }} />
      <DialogContent>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography level={'title-md'} fontWeight={'bold'}>
              Authors
            </Typography>
            <Typography level={'title-sm'} color={'neutral'}>
              The filter allows you to select books by author.
            </Typography>
            <Autocomplete<AuthorItem, true>
              multiple
              size={'lg'}
              placeholder={'Authors'}
              options={authors}
              value={authorsFilter}
              getOptionLabel={option => option.name}
              onChange={(event, newValue) => {
                setAuthorsFilter(newValue);
              }}
            />
          </Stack>
          {canManageFavorites && (
            <Stack spacing={2}>
              <Typography level={'title-md'} fontWeight={'bold'}>
                Favorites
              </Typography>
              <Stack spacing={2}>
                {CATEGORIES.map(item => {
                  return (
                    <Checkbox
                      key={item}
                      checked={categoriesFilter.includes(item)}
                      variant={'soft'}
                      label={CATEGORIES_LABELS[item]}
                      onChange={event => {
                        if (event.target.checked) {
                          setCategoriesFilter(val => [...val, item]);
                        } else {
                          setCategoriesFilter(val => val.filter(text => text !== item));
                        }
                      }}
                    />
                  );
                })}
              </Stack>
            </Stack>
          )}
        </Stack>
      </DialogContent>
      <Divider sx={{ mt: 'auto' }} />
      <Stack direction="row" justifyContent="space-between" useFlexGap spacing={1}>
        <Button variant="outlined" color="neutral" onClick={onClose}>
          Close
        </Button>
        <Button onClick={handleChange}>Show</Button>
      </Stack>
    </AdaptiveDrawer>
  );
};
