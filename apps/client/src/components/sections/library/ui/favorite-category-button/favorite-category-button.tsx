import React from 'react';
import {
  Divider,
  Dropdown,
  IconButton,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Skeleton,
} from '@mui/joy';
import { Bookmark, BookmarkAdd, DeleteForever } from '@mui/icons-material';
import { FavoriteBookCategory } from '../../../../../graphql/graphql';
import { OverridableStringUnion } from '@mui/types';
import { ColorPaletteProp } from '@mui/joy/styles/types';
import { IconButtonPropsColorOverrides } from '@mui/joy/IconButton/IconButtonProps';
import { useCurrentUser } from '../../../../../hooks/use-current-user';
import { voidFunction } from '../../../../../globals/helpers/void-function';

interface Props {
  favoriteCategory?: FavoriteBookCategory | null;
  loading?: boolean;
  onAddToFavorites?: (category: FavoriteBookCategory) => void;
  onChangeFavoriteCategory?: (category: FavoriteBookCategory) => void;
  onRemoveFromFavorites?: () => void;
}

const colors: Record<FavoriteBookCategory, OverridableStringUnion<ColorPaletteProp, IconButtonPropsColorOverrides>> = {
  [FavoriteBookCategory.WantToRead]: 'primary',
  [FavoriteBookCategory.ReadingNow]: 'warning',
  [FavoriteBookCategory.Read]: 'success',
  [FavoriteBookCategory.DidNotFinish]: 'danger',
};

export const FavoriteCategoryButton: React.FC<Props> = ({
  favoriteCategory,
  loading,
  onAddToFavorites = voidFunction,
  onChangeFavoriteCategory = voidFunction,
  onRemoveFromFavorites = voidFunction,
}) => {
  const { canManageFavorites } = useCurrentUser();

  const [category, setCategory] = React.useState<FavoriteBookCategory | null | undefined>(favoriteCategory);

  const handleSelectFavoriteCategory = React.useCallback(
    (_category: FavoriteBookCategory) => {
      setCategory(_category);
      if (!favoriteCategory) {
        onAddToFavorites(_category);
        return;
      }
      onChangeFavoriteCategory(_category);
    },
    [favoriteCategory, onAddToFavorites, onChangeFavoriteCategory],
  );

  const handleRemoveFromFavorites = React.useCallback(() => {
    setCategory(null);
    onRemoveFromFavorites();
  }, [onRemoveFromFavorites]);

  React.useEffect(() => {
    if (favoriteCategory !== category) {
      setCategory(favoriteCategory);
    }
  }, [favoriteCategory]);

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{
          root: {
            variant: 'plain',
            color: category && canManageFavorites ? colors[category] : 'neutral',
            size: 'sm',
          },
        }}
      >
        {category && canManageFavorites ? <Bookmark /> : <BookmarkAdd />}
        <Skeleton loading={loading} />
      </MenuButton>

      <Menu disablePortal>
        {canManageFavorites && (
          <>
            <MenuItem onClick={() => handleSelectFavoriteCategory(FavoriteBookCategory.WantToRead)}>
              <ListItemDecorator>
                <Bookmark color={'primary'} />
              </ListItemDecorator>
              Want to read
            </MenuItem>
            <MenuItem onClick={() => handleSelectFavoriteCategory(FavoriteBookCategory.ReadingNow)}>
              <ListItemDecorator>
                <Bookmark color={'warning'} />
              </ListItemDecorator>
              Reading now
            </MenuItem>
            <MenuItem onClick={() => handleSelectFavoriteCategory(FavoriteBookCategory.Read)}>
              <ListItemDecorator>
                <Bookmark color={'success'} />
              </ListItemDecorator>
              Read
            </MenuItem>
            <MenuItem onClick={() => handleSelectFavoriteCategory(FavoriteBookCategory.DidNotFinish)}>
              <ListItemDecorator>
                <Bookmark color={'error'} />
              </ListItemDecorator>
              Did not finish
            </MenuItem>
            {category && <Divider />}
            {category && (
              <MenuItem variant="soft" color="danger" onClick={handleRemoveFromFavorites}>
                <ListItemDecorator sx={{ color: 'inherit' }}>
                  <DeleteForever />
                </ListItemDecorator>
                Remove
              </MenuItem>
            )}
          </>
        )}
        {!canManageFavorites && (
          <Sheet variant={'plain'} sx={{ p: 1, bgcolor: 'transparent' }}>
            You need to log in
          </Sheet>
        )}
      </Menu>
    </Dropdown>
  );
};
