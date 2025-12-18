import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { WORKOUT_ACTIONS } from '../types/workout';
import { AUTH_ACTIONS } from '../types/auth';

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { authDispatch } = useAuthContext();

  const signup = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    console.log(email, password);
    const res = await fetch('/api/user/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    console.log(res);
    const json = await res.json();
    console.log(json);

    if (!res.ok) {
      setError(json.error);
      setIsLoading(false);
      return;
    }

    if (res.ok) {
      authDispatch({ type: AUTH_ACTIONS.LOGIN, payload: json });
      setIsLoading(false);
      localStorage.setItem('User', JSON.stringify(json));
    }
  };
  return { isLoading, error, signup };
};
