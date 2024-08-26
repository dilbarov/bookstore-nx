import React from 'react';
import { CssBaseline, extendTheme, ThemeProvider } from '@mui/joy';

interface Props {
  children?: React.ReactNode;
}

export const ThemeContext: React.FC<Props> = ({ children }) => {
  const theme = React.useMemo(
    () =>
      extendTheme({
        spacing: 8,
        fontFamily: {
          display: ['-apple-system', 'BlinkMacSystemFont', 'Roboto', 'sans-serif'].join(','),
          body: ['-apple-system', 'BlinkMacSystemFont', 'Roboto', 'sans-serif'].join(','),
        },
        colorSchemes: {
          light: {
            palette: {
              background: {
                body: '#F0F0F0',
              },
            },
          },
        },
      }),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
