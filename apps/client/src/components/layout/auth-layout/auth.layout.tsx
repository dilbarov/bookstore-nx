import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/joy';
import React from 'react';
import { AuthContainer } from '../../wrappers/auth-container';

export const AuthLayout = () => {
  return (
    <Stack alignItems={'center'}>
      <AuthContainer>
        <Outlet />
      </AuthContainer>
    </Stack>
  );
};
