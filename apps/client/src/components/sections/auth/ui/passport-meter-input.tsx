import React from 'react';
import { LinearProgress, Stack, Typography } from '@mui/joy';
import { PasswordInput } from './password-input';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const PassportMeterInput: React.FC<Props> = ({ value, onChange }) => {
  const minLength = 12;
  return (
    <Stack
      spacing={0.5}
      sx={{
        '--hue': Math.min(value.length * 10, 120),
      }}
    >
      <PasswordInput value={value} onChange={onChange} />
      <LinearProgress
        determinate
        size="sm"
        value={Math.min((value.length * 100) / minLength, 100)}
        sx={{
          bgcolor: 'background.level3',
          color: 'hsl(var(--hue) 80% 40%)',
        }}
      />
      <Typography level="body-xs" sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}>
        {value.length < 3 && 'Very weak'}
        {value.length >= 3 && value.length < 6 && 'Weak'}
        {value.length >= 6 && value.length < 10 && 'Strong'}
        {value.length >= 10 && 'Very strong'}
      </Typography>
    </Stack>
  );
};
