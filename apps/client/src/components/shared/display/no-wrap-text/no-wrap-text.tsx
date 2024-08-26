import React from 'react';
import { TypographyProps } from '@mui/joy';
import { Typography } from '@mui/joy';

export const NoWrapText: React.FC<TypographyProps> = ({ children, maxWidth, ...props }) => {
  return (
    <Typography noWrap maxWidth={maxWidth} {...props}>
      {children}
    </Typography>
  );
};
