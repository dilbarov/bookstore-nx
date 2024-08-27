import React from 'react';
import { Logo } from '../../../shared/logo/logo';
import { Button, Card, CardContent, FormControl, FormHelperText, Input, Link, Stack, Typography } from '@mui/joy';
import FaceIcon from '@mui/icons-material/Face';
import { PassportMeterInput } from '../ui/passport-meter-input';
import { useRegister } from '../hooks/use-register';
import { InfoOutlined } from '@mui/icons-material';
import { RoutePaths } from '../../../../router/routes-paths';
import { useNavigate } from 'react-router-dom';

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, changeLogin, password, setPassword, handleRegister, loading, isEmailExists } = useRegister();

  const redirectToLogin = React.useCallback(() => {
    navigate(RoutePaths.login);
  }, []);

  return (
    <Stack spacing={2}>
      <Logo />
      <Card variant={'plain'} size={'lg'}>
        <CardContent>
          <Stack spacing={2}>
            <Typography level={'h4'}>Registration</Typography>
            <Stack spacing={1}>
              <FormControl error={isEmailExists}>
                <Input
                  size={'lg'}
                  value={login}
                  onChange={event => changeLogin(event.target.value)}
                  startDecorator={<FaceIcon />}
                />
                {isEmailExists && (
                  <FormHelperText>
                    <InfoOutlined />
                    Email already exists
                  </FormHelperText>
                )}
              </FormControl>
              <PassportMeterInput value={password} onChange={setPassword} />
              <Button size={'lg'} loading={loading} onClick={handleRegister} disabled={!login || !password}>
                Sign Up
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Typography textAlign={'end'}>
        Already have account? <Link onClick={redirectToLogin}>Log in</Link>
      </Typography>
    </Stack>
  );
};
