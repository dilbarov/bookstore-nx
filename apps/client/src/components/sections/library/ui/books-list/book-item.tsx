import React from 'react';
import { AspectRatio, Button, Card, CardContent, Skeleton, Stack, Typography } from '@mui/joy';
import { FavoriteBookCategory } from '../../../../../graphql/graphql';
import { FavoriteCategoryButton } from '../favorite-category-button/favorite-category-button';

interface Props {
  title?: string;
  author?: string;
  url?: string;
  favoriteCategory?: FavoriteBookCategory | null;
  onAddToFavorites?: (category: FavoriteBookCategory) => void;
  onChangeFavoriteCategory?: (category: FavoriteBookCategory) => void;
  onRemoveFromFavorites?: () => void;
  onExplore?: () => void;
  loading?: boolean;
}

export const BookItem: React.FC<Props> = ({
  title,
  author,
  url,
  favoriteCategory,
  loading,
  onExplore,
  onAddToFavorites,
  onChangeFavoriteCategory,
  onRemoveFromFavorites,
}) => {
  return (
    <Card variant="soft" sx={{ width: '100%' }}>
      <div>
        <Stack justifyContent={'space-between'} alignItems={'start'} direction={'row'}>
          <Typography level="title-lg">
            <Skeleton loading={loading}>{title}</Skeleton>
          </Typography>

          <FavoriteCategoryButton
            favoriteCategory={favoriteCategory}
            loading={loading}
            onChangeFavoriteCategory={onChangeFavoriteCategory}
            onAddToFavorites={onAddToFavorites}
            onRemoveFromFavorites={onRemoveFromFavorites}
          />
        </Stack>
        <Typography level="body-sm">
          <Skeleton loading={loading}>{author}</Skeleton>
        </Typography>
      </div>
      <AspectRatio minHeight="200px" maxHeight="200px">
        <Skeleton loading={loading} variant={'overlay'}>
          <img src={url} srcSet={`${url} 2x`} loading={'lazy'} alt={title} />
        </Skeleton>
      </AspectRatio>
      <CardContent orientation={'horizontal'}>
        <Button
          variant={'solid'}
          size={'md'}
          color={'primary'}
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
          onClick={onExplore}
        >
          Explore
          <Skeleton loading={loading} />
        </Button>
      </CardContent>
    </Card>
  );
};
