import { useScreen } from '../../../../../hooks/use-screen';
import { BookItem } from './book-item';
import { Grid } from '@mui/joy';
import React from 'react';

export const BooksListSkeleton = () => {
  const { isMobile, isTablet } = useScreen();

  const skeletonItems = [1, 2, 3];

  if (isMobile) {
    skeletonItems.pop();
  }

  if (isTablet) {
    skeletonItems.push(4);
  }

  return skeletonItems.map(item => (
    <Grid xs={12} sm={6} md={4} key={item}>
      <BookItem loading title={'Loading books title'} author={'Loading'} />
    </Grid>
  ));
};
