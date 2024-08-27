import { RoutePaths } from '../../../../router/routes-paths';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useRegisterMutation } from '../../../../graphql/graphql';
import { getVisitorId } from '../../../../globals/helpers/fingerprint';

export const useRegister = () => {
  const navigate = useNavigate();
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isEmailInvalid, setIsEmailInvalid] = React.useState(false);
  const [isEmailExists, setIsEmailExists] = React.useState(false);

  const [registerMutation, { loading, error }] = useRegisterMutation({
    onCompleted: data => {
      const { accessToken, refreshToken } = data.register;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      navigate(`/${RoutePaths.books}`);
    },
    onError: err => {
      err.graphQLErrors.map(error => {
        if (error.extensions?.code === 'EMAIL_EXISTS') {
          setIsEmailExists(true);
        }
      });

      console.error('Registration error:', err.graphQLErrors);
    },
  });

  const handleRegister = async () => {
    const fingerprint = await getVisitorId();
    await registerMutation({
      variables: {
        email: login,
        password,
        fingerprint,
      },
    });
  };

  const changeLogin = React.useCallback((value: string) => {
    setLogin(value);
    setIsEmailExists(false);
  }, []);

  return {
    login,
    changeLogin,
    password,
    setPassword,
    handleRegister,
    loading,
    error,
    isEmailExists,
  };
};
