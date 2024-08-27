import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useLoginMutation } from '../../../../graphql/graphql';
import { RoutePaths } from '../../../../router/routes-paths';
import { getVisitorId } from '../../../../globals/helpers/fingerprint';
import { isValidEmail } from '../../../../globals/validations/is-valid-email';

export const useLogin = () => {
  const navigate = useNavigate();
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isEmailInvalid, setIsEmailInvalid] = React.useState(false);
  const [isCredentialsInvalid, setIsCredentialsInvalid] = React.useState(false);

  const [loginMutation, { loading, error }] = useLoginMutation({
    onCompleted: data => {
      const { accessToken, refreshToken } = data.login;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      navigate(`/${RoutePaths.books}`);
    },
    onError: err => {
      setIsCredentialsInvalid(true);
    },
  });

  const handleLogin = async () => {
    if (!isValidEmail(login)) {
      setIsEmailInvalid(true);
      return;
    }

    const fingerprint = await getVisitorId();
    await loginMutation({
      variables: {
        email: login,
        password,
        fingerprint,
      },
    });
  };

  const changeLogin = React.useCallback((value: string) => {
    setLogin(value);
    setIsCredentialsInvalid(false);
    setIsEmailInvalid(false);
  }, []);

  const changePassword = React.useCallback((value: string) => {
    setPassword(value);
    setIsCredentialsInvalid(false);
  }, []);

  return {
    login,
    changeLogin,
    password,
    changePassword,
    handleLogin,
    loading,
    isEmailInvalid,
    isCredentialsInvalid,
  };
};
