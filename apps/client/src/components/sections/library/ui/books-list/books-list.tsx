import React from 'react';
import { Alert, Grid } from '@mui/joy';
import { BookItem } from './book-item';
import { BookResponse, CreateFavoriteDto, DeleteFavoriteDto, UpdateFavoriteDto } from '../../../../../graphql/graphql';
import { BooksListSkeleton } from './books-list-skeleton';
import { voidFunction } from '../../../../../globals/helpers/void-function';

interface Props {
  items: BookResponse[];
  loading: boolean;
  onExplore: (id: string) => void;
  onAddToFavorites?: (data: Pick<CreateFavoriteDto, 'entityId' | 'category'>) => void;
  onChangeFavoriteCategory?: (data: Pick<UpdateFavoriteDto, 'entityId' | 'category'>) => void;
  onRemoveFromFavorites?: (data: Pick<DeleteFavoriteDto, 'entityId'>) => void;
}

export const BooksList: React.FC<Props> = ({
  loading,
  items,
  onExplore,
  onAddToFavorites = voidFunction,
  onChangeFavoriteCategory = voidFunction,
  onRemoveFromFavorites = voidFunction,
}) => {
  if (!loading && items.length === 0) {
    return (
      <Alert color={'warning'} size={'lg'} sx={{ justifyContent: 'center' }}>
        No books found
      </Alert>
    );
  }

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      {loading && <BooksListSkeleton />}
      {items.map(item => (
        <Grid xs={12} sm={6} md={4} key={item.id}>
          <BookItem
            title={item.title}
            author={item.author.name}
            url={item.url}
            favoriteCategory={item.favoriteCategory}
            onAddToFavorites={category =>
              onAddToFavorites({
                category,
                entityId: item.id,
              })
            }
            onChangeFavoriteCategory={category =>
              onChangeFavoriteCategory({
                category,
                entityId: item.id,
              })
            }
            onRemoveFromFavorites={() =>
              onRemoveFromFavorites({
                entityId: item.id,
              })
            }
            onExplore={() => onExplore(item.id)}
            loading={loading}
          />
        </Grid>
      ))}
    </Grid>
  );
};
