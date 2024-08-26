import React from 'react';
import { AdaptiveDrawer } from '../../../../shared/adaptive/adaptive-drawer';
import { Autocomplete, Button, DialogContent, DialogTitle, Divider, Stack } from '@mui/joy';
import { Filters } from '../../hooks/use-books';
import { AuthorModel } from '../../../../../graphql/graphql';
import { voidFunction } from '../../../../../globals/helpers/void-function';

type AuthorItem = Pick<AuthorModel, 'id' | 'name'>;

interface Props {
  filters?: Filters;
  authors?: AuthorItem[];
  opened: boolean;
  onClose: () => void;
  onChange?: (filters: Filters) => void;
}

export const FiltersDrawer: React.FC<Props> = ({ opened, onClose, filters, authors = [], onChange = voidFunction }) => {
  const [authorsFilter, setAuthorsFilter] = React.useState<AuthorItem[]>(filters?.authors || []);

  const handleChange = React.useCallback(() => {
    onChange({
      authors: authorsFilter,
    });
    onClose();
  }, [authorsFilter, onChange, onClose]);

  return (
    <AdaptiveDrawer opened={opened} onClose={onClose} showCloseButton anchor={'left'}>
      <DialogTitle>Filters</DialogTitle>
      <Divider sx={{ mt: 'auto' }} />
      <DialogContent>
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
