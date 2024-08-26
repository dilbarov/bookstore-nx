import React from 'react';
import { Alert } from '@mui/joy';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export const NotFoundAlert: React.FC = () => {
  return (
    <Alert variant={'soft'} color={'warning'} startDecorator={<SentimentVeryDissatisfiedIcon />}>
      Page not found
    </Alert>
  );
};
