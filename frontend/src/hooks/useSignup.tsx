import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { authDispatch } = useAuthContext();

  const signup = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    const res = await fetch('/api/user/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      setIsLoading(false);
    }

    if (res.ok) {
      authDispatch({ type: 'LOGIN', payload: json });
      setIsLoading(false);
      localStorage.setItem('User', JSON.stringify(json));
    }
  };
  return { isLoading, error, signup };
};
