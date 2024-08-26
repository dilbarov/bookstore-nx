import React from 'react';
import { AspectRatio, Skeleton } from '@mui/joy';

interface Props {
  src: string;
  alt: string;
  width?: string | number;
  borderRadius?: string;
  loading?: boolean;
}

export const Image: React.FC<Props> = ({ src, alt, width, borderRadius, loading = false }) => {
  if (loading) {
    return (
      <AspectRatio
        variant="plain"
        minHeight={250}
        maxHeight={300}
        sx={{ width, bgcolor: 'transparent', borderRadius, height: 'auto' }}
      >
        <Skeleton loading={loading} variant={'overlay'}></Skeleton>
      </AspectRatio>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      style={{ height: 'auto', width, display: 'block', objectFit: 'contain', borderRadius }}
      loading={'lazy'}
      srcSet={`${src} 2x`}
    />
  );
};
