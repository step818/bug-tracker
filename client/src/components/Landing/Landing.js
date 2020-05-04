import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <h1>Welcome to Goal Tracker</h1>
      <p>Effectively and efficiently get shit done with some structure in your mother-fucking life!</p>
      <Link to='/register'>Sign Up</Link>
      <Link to='/login'>Log in</Link>
    </div>
  )
}

export default Landing;
