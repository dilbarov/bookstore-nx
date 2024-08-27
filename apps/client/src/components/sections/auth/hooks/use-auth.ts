import { useRefreshTokensMutation } from '../../../../graphql/graphql';
import { getVisitorId } from '../../../../globals/helpers/fingerprint';

export const useAuth = () => {
  const [refreshTokensMutation] = useRefreshTokensMutation();

  const refresh = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      return null;
    }
    const fingerprint = await getVisitorId();
    const { data } = await refreshTokensMutation({
      variables: { refreshToken, fingerprint },
    });

    if (!data?.refreshTokens) {
      return null;
    }

    const { accessToken, refreshToken: newRefreshToken } = data.refreshTokens;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    return accessToken;
  };

  return { refresh };
};
