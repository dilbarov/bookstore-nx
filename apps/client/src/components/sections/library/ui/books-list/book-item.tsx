import React from 'react';
import { AspectRatio, Button, Card, CardContent, IconButton, Skeleton, Stack, Typography } from '@mui/joy';
import { BookmarkAdd } from '@mui/icons-material';

interface Props {
  title?: string;
  author?: string;
  url?: string;
  onAddToFavorites?: () => void;
  onExplore?: () => void;
  loading?: boolean;
}

export const BookItem: React.FC<Props> = ({ title, author, url, loading, onExplore, onAddToFavorites }) => {
  return (
    <Card variant="soft" sx={{ width: '100%' }}>
      <div>
        <Stack justifyContent={'space-between'} alignItems={'start'} direction={'row'}>
          <Typography level="title-lg">
            <Skeleton loading={loading}>{title}</Skeleton>
          </Typography>

          <IconButton variant={'plain'} color={'neutral'} size={'sm'} onClick={onAddToFavorites}>
            <BookmarkAdd />
            <Skeleton loading={loading} />
          </IconButton>
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
