import { Stack } from '@mui/joy';
import { MainContainer } from '../../../wrappers/main-container';
import React from 'react';

export const AppBar = () => {
  return (
    <Stack alignItems={'center'} sx={{ bgcolor: 'white', position: 'sticky', top: 0, zIndex: 1200 }}>
      <MainContainer>
        <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <img src="/logo.png" alt="Logo" style={{ maxHeight: 60 }} />
            <h2>Book Store</h2>
          </Stack>
        </Stack>
      </MainContainer>
    </Stack>
  );
};
