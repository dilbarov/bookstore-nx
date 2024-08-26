import React from 'react';
import { Badge, Button, IconButton } from '@mui/joy';
import { voidFunction } from '../../../../../globals/helpers/void-function';
import TuneIcon from '@mui/icons-material/Tune';
import { useScreen } from '../../../../../hooks/use-screen';

interface Props {
  onClick?: () => void;
  badge?: boolean;
}

export const FiltersButton: React.FC<Props> = ({ onClick = voidFunction, badge }) => {
  const { isMobile } = useScreen();
  return (
    <Badge invisible={!badge}>
      {!isMobile && (
        <Button size={'lg'} color={'neutral'} variant={'outlined'} onClick={onClick} startDecorator={<TuneIcon />}>
          Filters
        </Button>
      )}

      {isMobile && (
        <IconButton size={'lg'} color={'neutral'} variant={'outlined'} onClick={onClick}>
          <TuneIcon />
        </IconButton>
      )}
    </Badge>
  );
};
