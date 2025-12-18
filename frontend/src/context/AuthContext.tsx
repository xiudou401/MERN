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

const initialState: AuthState = { user: null };

interface AuthContextValue extends AuthState {
  authDispatch: Dispatch<AuthAction>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext<AuthContextValue>({
  user: null,
  authDispatch: () => {},
});

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      return { user: action.payload };
    case AUTH_ACTIONS.LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, authDispatch] = useReducer(authReducer, initialState);

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
