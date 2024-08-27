import { Stack } from '@mui/joy';
import React from 'react';

export const Logo = () => {
  return (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      <img src="/logo.png" alt="Logo" style={{ maxHeight: 60 }} />
      <h2>Book Store</h2>
    </Stack>
  );
};
