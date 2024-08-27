import { useGetCurrentUserQuery, useLogoutMutation, UserModel } from '../../graphql/graphql';
import React from 'react';

type User = Pick<UserModel, 'id' | 'email'>;

export interface UserContextType {
  user: User | null;
  canManageFavorites: boolean;
  logout: () => void;
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);

  useGetCurrentUserQuery({
    onCompleted: data => setUser(data.getCurrentUser),
  });

  const [logoutMutation] = useLogoutMutation();

  const logout = async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    await logoutMutation();
  };

  return <UserContext.Provider value={{ user, logout, canManageFavorites: !!user }}>{children}</UserContext.Provider>;
};
