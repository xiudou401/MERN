import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, { user: null });
  const user = localStorage.getItem('User');

  useEffect(() => {
    if (user) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
