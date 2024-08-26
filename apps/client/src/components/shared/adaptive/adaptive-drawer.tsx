import React from 'react';
import { Drawer, ModalClose, Sheet } from '@mui/joy';
import { DrawerTypeMap } from '@mui/joy/Drawer/DrawerProps';
import { useScreen } from '../../../hooks/use-screen';

interface Props {
  opened?: boolean;
  anchor?: DrawerTypeMap['props']['anchor'];
  onClose?: () => void;
  showCloseButton?: boolean;
  children?: React.ReactNode;
}

export const AdaptiveDrawer: React.FC<Props> = ({
  anchor = 'right',
  opened = false,
  showCloseButton = false,
  onClose,
  children,
}) => (
  <Drawer
    variant={'plain'}
    anchor={anchor}
    open={opened}
    onClose={onClose}
    slotProps={{
      content: {
        sx: {
          bgcolor: 'transparent',
          p: { sm: 3, xs: 0 },
          boxShadow: 'none',
          width: {
            xs: '100%',
            sm: 600,
          },
        },
      },
    }}
  >
    <Sheet
      sx={{
        borderRadius: { sm: 'md', xs: 0 },
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
        width: '100%',
        overflow: 'auto',
      }}
    >
      {showCloseButton && <ModalClose />}
      {children}
    </Sheet>
  </Drawer>
);
