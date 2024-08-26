import { useTheme } from '@mui/joy';
import { useMedia } from 'react-use';

type ScreenOptions = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

export const useScreen = (): ScreenOptions => {
  const theme = useTheme();

  const isMobile = useMedia(`(max-width: ${theme.breakpoints.values.sm}px)`);
  const isTablet = useMedia(
    `(min-width: ${theme.breakpoints.values.sm + 1}px) and (max-width: ${theme.breakpoints.values.md}px)`,
  );
  const isDesktop = useMedia(`(min-width: ${theme.breakpoints.values.md + 1}px)`);

  return {
    isMobile,
    isTablet: !isMobile && isTablet,
    isDesktop: !isMobile && !isTablet && isDesktop,
  };
};
