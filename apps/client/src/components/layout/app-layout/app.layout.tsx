import React from 'react';
import { Box, Stack } from '@mui/joy';
import { useScreen } from '../../../hooks/use-screen';
import { MainContainer } from '../../wrappers/main-container';
import { Outlet } from 'react-router-dom';
import { AppBar } from './ui/app-bar';
import { UserProvider } from '../../../contexts/current-user/current-user-context';

export const AppLayout = () => {
  const { isMobile, isTablet, isDesktop } = useScreen();
  return (
    <UserProvider>
      <Box
        sx={theme => ({
          [theme.breakpoints.only('xs')]: {
            pb: 1,
          },
        })}
      >
        <Stack spacing={1}>
          <AppBar />
          <Stack alignItems={'center'}>
            <MainContainer>
              <Outlet />
            </MainContainer>
          </Stack>
        </Stack>
      </Box>
    </UserProvider>
  );
};
