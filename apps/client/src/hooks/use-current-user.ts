import React from 'react';
import { UserContext, UserContextType } from '../contexts/current-user/current-user-context';

export const useCurrentUser = (): UserContextType => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
