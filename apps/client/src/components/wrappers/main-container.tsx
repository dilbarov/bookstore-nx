import React from 'react';
import { styled } from '@mui/joy';

export const ContainerWrapper = styled(`div`)(({ theme }) => ({
  maxWidth: 900,
  width: '100%',
  margin: 'auto',
  [theme.breakpoints.only('xs')]: {
    marginLeft: 0,
    marginRight: 0,
  },
  [theme.breakpoints.only('sm')]: {
    marginLeft: 8,
    marginRight: 8,
  },
  [theme.breakpoints.up('md')]: {
    marginLeft: 24,
    marginRight: 24,
  },
}));

interface Props {
  children?: React.ReactNode;
}

export const MainContainer: React.FC<Props> = ({ children }) => (
  <ContainerWrapper id="app-container">{children}</ContainerWrapper>
);
