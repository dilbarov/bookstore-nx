import React from 'react';
import { Key } from '@mui/icons-material';
import { Input } from '@mui/joy';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const PasswordInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Input
      type={'password'}
      size={'lg'}
      startDecorator={<Key />}
      value={value}
      onChange={event => onChange(event.target.value)}
    />
  );
};
