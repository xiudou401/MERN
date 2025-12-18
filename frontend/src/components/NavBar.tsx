import React from 'react';
import { Link } from 'react-router';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { AUTH_ACTIONS } from '../types/auth';

const NavBar = () => {
  const { user, authDispatch } = useAuthContext();
  const { workoutDispatch } = useWorkoutContext();
  const handleClick = () => {
    authDispatch({ type: AUTH_ACTIONS.LOGOUT, payload: null });
    localStorage.removeItem('User');
    workoutDispatch({ type: 'SET_WORKOUTS', payload: [] });
  };
  return (
    <div>
      <h1>Workout Buddy</h1>
      <div>
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={handleClick}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Sign up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
