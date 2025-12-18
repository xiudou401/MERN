import React from 'react';
import { Link } from 'react-router';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const NavBar = () => {
  const { user, dispatch } = useAuthContext();
  const { dispatch: WorkoutDispatch } = useWorkoutContext();
  const handleClick = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('User');
    WorkoutDispatch({ type: 'SET_WORKOUTS', payload: null });
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
