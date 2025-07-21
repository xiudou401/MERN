import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const Navbar = () => {
  const { user, dispatch } = useAuthContext();
  const { dispatch: workoutDispatch } = useWorkoutContext();
  const handleClick = () => {
    dispatch({ type: 'LOGOUT' });
    workoutDispatch({ type: 'SET_WORKOUTS', payload: null });
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
