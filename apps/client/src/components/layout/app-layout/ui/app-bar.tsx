import { Button, Dropdown, IconButton, ListItemDecorator, Menu, MenuButton, MenuItem, Stack } from '@mui/joy';
import { MainContainer } from '../../../wrappers/main-container';
import React from 'react';
import { Logo } from '../../../shared/logo/logo';
import { useCurrentUser } from '../../../../hooks/use-current-user';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../../router/routes-paths';

export const AppBar = () => {
  const { user, canManageFavorites, logout } = useCurrentUser();
  const navigate = useNavigate();
  const redirectToLogin = React.useCallback(() => {
    navigate(RoutePaths.login);
  }, []);

  return (
    <Stack alignItems={'center'} sx={{ bgcolor: 'white', position: 'sticky', top: 0, zIndex: 1000 }}>
      <MainContainer>
        <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
          <Logo />
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            {!user && (
              <Button variant={'solid'} onClick={redirectToLogin}>
                Log In
              </Button>
            )}
            {canManageFavorites && (
              <IconButton>
                <BookmarkOutlinedIcon />
              </IconButton>
            )}
            {user && (
              <Dropdown>
                <MenuButton
                  size={'md'}
                  slots={{ root: IconButton }}
                  slotProps={{ root: { variant: 'soft' } }}
                  sx={{ borderRadius: 50, fontWeight: 700 }}
                >
                  {user.email[0].toUpperCase()}
                </MenuButton>
                <Menu variant={'plain'} placement="bottom-end">
                  <MenuItem onClick={logout}>
                    Logout
                    <ListItemDecorator>
                      <LogoutOutlinedIcon />
                    </ListItemDecorator>
                  </MenuItem>
                </Menu>
              </Dropdown>
            )}
          </Stack>
        </Stack>
      </MainContainer>
    </Stack>
  );
};
