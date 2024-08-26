import React from 'react';
import { Alert, Grid } from '@mui/joy';
import { BookItem } from './book-item';
import { BookModel } from '../../../../../graphql/graphql';
import { BooksListSkeleton } from './books-list-skeleton';

interface Props {
  items: BookModel[];
  loading: boolean;
  onExplore: (id: string) => void;
}

export const BooksList: React.FC<Props> = ({ loading, items, onExplore }) => {
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
            onAddToFavorites={() => console.log('Click')}
            onExplore={() => onExplore(item.id)}
            loading={loading}
          />
        </Grid>
      ))}
    </Grid>
  );
};
