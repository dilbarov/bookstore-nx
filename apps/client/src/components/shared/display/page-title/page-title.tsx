import { ArrowBackOutlined } from '@mui/icons-material';
import { Location } from 'history';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';

import { NoWrapText } from '../no-wrap-text/no-wrap-text';
import { useScreen } from '../../../../hooks/use-screen';
import { APP_NAME } from '../../../../globals/contants';
import { Box, IconButton, Stack, Typography } from '@mui/joy';

type Props = { title: string } & (
  | { isChildren?: false; returnTo?: undefined }
  | { isChildren?: true; returnTo: string }
);

export const PageTitle: React.FC<Props> = ({ title, isChildren = false, returnTo }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isDesktop } = useScreen();

  const locationState = location.state as Location | null;
  const isVisible = isChildren && (returnTo || locationState);

  const handleBack = (): void => {
    if (locationState && locationState.pathname) {
      navigate(locationState.pathname, { state: locationState.state });
    }
    if (!locationState && returnTo) {
      navigate(returnTo);
    }
  };

  return (
    <Box sx={{ ml: isDesktop && isVisible ? `-52px` : 0 }}>
      <Helmet title={`${APP_NAME} — ${title}`} />
      <Stack direction={'row'} alignItems={'top'} spacing={1} sx={{ pl: 1 }}>
        {isVisible && (
          <Box>
            <IconButton size={'md'} onClick={handleBack}>
              <ArrowBackOutlined sx={{ fontSize: 28 }} />
            </IconButton>
          </Box>
        )}
        {title.length > 60 ? (
          <NoWrapText level={`h1`}>{title}</NoWrapText>
        ) : (
          <Typography level={`h1`}>{title}</Typography>
        )}
      </Stack>
    </Box>
  );
};
