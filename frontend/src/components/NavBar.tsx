import React from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const NavBar = () => {
  const { user, authDispatch } = useAuthContext();
  const { workoutDispatch } = useWorkoutContext();
  const handleClick = () => {
    authDispatch({ type: 'LOGOUT' });
    localStorage.removeItem('User');
    workoutDispatch({ type: 'SET_WORKOUTS', payload: [] });
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
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
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
