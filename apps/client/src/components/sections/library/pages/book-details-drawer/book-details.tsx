import { Box, Card, DialogContent, Skeleton, Stack, Typography, useTheme } from '@mui/joy';
import { Image } from '../../../../shared/customs/image';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import React from 'react';
import { useScreen } from '../../../../../hooks/use-screen';
import { useBook } from '../../hooks/use-book';
import { useFavorite } from '../../hooks/use-favorite';
import { FavoriteCategoryButton } from '../../ui/favorite-category-button/favorite-category-button';

export const BookDetails = () => {
  const theme = useTheme();
  const { isMobile } = useScreen();
  const { createFavorite, updateFavorite, deleteFavorite } = useFavorite();

  const { book, loading } = useBook();

  return (
    <DialogContent sx={{ gap: 2 }}>
      <Card variant={'soft'} size="lg" sx={{ bgcolor: '#333333' }}>
        <Stack>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography level={'h2'} sx={{ color: 'white' }}>
              <Skeleton loading={loading}>{book.title}</Skeleton>
            </Typography>
            <FavoriteCategoryButton
              loading={loading}
              favoriteCategory={book.favoriteCategory}
              onChangeFavoriteCategory={category =>
                updateFavorite({
                  category,
                  entityId: book.id,
                })
              }
              onAddToFavorites={category =>
                createFavorite({
                  category,
                  entityId: book.id,
                })
              }
              onRemoveFromFavorites={() => deleteFavorite({ entityId: book.id })}
            />
          </Stack>
          <Typography level={'body-lg'} sx={{ color: 'white' }}>
            <Skeleton loading={loading}>{book.author.name}</Skeleton>
          </Typography>

          <Box sx={{ height: 50 }}></Box>
        </Stack>
      </Card>
      <Box sx={{ mt: -12, zIndex: 100, p: 3 }}>
        <Stack direction={'row'} spacing={isMobile ? 1 : 3} alignItems={isMobile ? 'start' : 'center'}>
          <Image src={book.url} alt={book.title} width={`200px`} borderRadius={'8px'} loading={loading} />

          <Stack spacing={isMobile ? 2 : 1}>
            <Stack direction={'row'} spacing={0} alignItems={'center'}>
              {!loading && (
                <StarBorderIcon
                  sx={{
                    fontSize: { sm: 40, xs: 32 },
                    color: { sm: theme.palette.warning[400], xs: theme.palette.warning[400] },
                  }}
                />
              )}

              <Typography
                sx={{
                  fontSize: { sm: 46, xs: 32 },
                  fontWeight: { sm: 'bold', xs: 'normal' },
                  color: { sm: theme.palette.text.primary, xs: theme.palette.common.white },
                }}
              >
                <Skeleton loading={loading}>{String(book.rating).padEnd(3, '.0')}</Skeleton>
              </Typography>
            </Stack>

            <Typography level={'body-md'} fontWeight={'bold'}>
              <Skeleton loading={loading}>Rating is based on community feedback</Skeleton>
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Card variant={'plain'} size="lg">
        <Typography level={'h4'}>Summary</Typography>
        <Typography level={'body-lg'}>
          <Skeleton loading={loading}>{book.description}</Skeleton>
        </Typography>
      </Card>
    </DialogContent>
  );
};
