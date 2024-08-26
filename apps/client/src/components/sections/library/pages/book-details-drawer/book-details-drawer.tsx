import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../../../router/routes-paths';
import { AdaptiveDrawer } from '../../../../shared/adaptive/adaptive-drawer';
import { Box, Button, Divider } from '@mui/joy';

export const BookDetailsDrawer: React.FC = () => {
  const navigate = useNavigate();

  const [opened, setOpened] = React.useState(false);

  React.useEffect(() => {
    setOpened(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpened(false);
    navigate(`/${RoutePaths.books}`);
  }, [navigate]);

  return (
    <AdaptiveDrawer opened={opened} onClose={handleClose}>
      <Outlet />

      <Divider sx={{ mt: 'auto' }} />
      <Box>
        <Button variant="solid" color="primary" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </AdaptiveDrawer>
  );
};
