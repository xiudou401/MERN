import React from 'react';
import { Link } from 'react-router';
import { useAuthContext } from '../hooks/useAuthContext';

const NavBar = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <h1>Workout Buddy</h1>
      <div>
        {user ? (
          <>
            <span>{user.email}</span>
            <button>Logout</button>
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
