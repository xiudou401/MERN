import { useContext } from 'react';
import { AuthContext, AuthContextValue } from '../context/AuthContext';

export const useAuthContext = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used inside an AuthContextProvider'
    );
  }
  return context;
};
