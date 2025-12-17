import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';
import { AUTH_ACTIONS, AuthAction, User } from '../types/auth';

export interface AuthState {
  user: User | null;
}

export interface AuthContextValue extends AuthState {
  authDispatch: Dispatch<AuthAction>;
}

// export const AuthContext = createContext<AuthContextValue | null>(null);
export const AuthContext = createContext<AuthContextValue>({
  user: null,
  authDispatch: () => {},
});

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      return { user: action.payload };
    case AUTH_ACTIONS.LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, authDispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const user = localStorage.getItem('User');
    if (user) {
      authDispatch({ type: 'LOGIN', payload: JSON.parse(user) });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
