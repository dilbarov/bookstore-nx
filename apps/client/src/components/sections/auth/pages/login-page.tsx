import { Button, Card, CardContent, FormControl, FormHelperText, Input, Link, Stack, Typography } from '@mui/joy';
import React from 'react';
import { Logo } from '../../../shared/logo/logo';
import FaceIcon from '@mui/icons-material/Face';
import { PasswordInput } from '../ui/password-input';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../../router/routes-paths';
import { useLogin } from '../hooks/use-login';
import { InfoOutlined } from '@mui/icons-material';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, changeLogin, password, changePassword, handleLogin, loading, isEmailInvalid, isCredentialsInvalid } =
    useLogin();

  const redirectToRegistration = React.useCallback(() => {
    navigate(RoutePaths.registration);
  }, []);

  return (
    <Stack spacing={2}>
      <Logo />
      <Card variant={'plain'} size={'lg'}>
        <CardContent>
          <Stack spacing={2}>
            <Typography level={'h4'}>Log In</Typography>
            <Stack spacing={1}>
              <FormControl error={isEmailInvalid || isCredentialsInvalid}>
                <Input
                  size={'lg'}
                  value={login}
                  onChange={event => changeLogin(event.target.value)}
                  startDecorator={<FaceIcon />}
                />
                {isEmailInvalid && (
                  <FormHelperText>
                    <InfoOutlined />
                    Should be a valid email address
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl error={isCredentialsInvalid}>
                <PasswordInput value={password} onChange={changePassword} />
                {isCredentialsInvalid && (
                  <FormHelperText>
                    <InfoOutlined />
                    Invalid email or password
                  </FormHelperText>
                )}
              </FormControl>
              <Button size={'lg'} onClick={handleLogin} loading={loading}>
                Log In
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Typography textAlign={'end'}>
        Do not have account? <Link onClick={redirectToRegistration}>Create account</Link>
      </Typography>
    </Stack>
  );
};
