import React from 'react';
import { Link } from 'react-router';

const NavBar = () => {
  return (
    <div>
      <h1>Workout Buddy</h1>
      <div>
        <Link to="/signup">Sign up</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default NavBar;
