import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({isAuthenticated}) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
    
  return (
    <div>
      <h1>Welcome to Goal Tracker</h1>
      <p>Effectively and efficiently get shit done with some structure in your mother-fucking life!</p>
      <Link to='/register'>Sign Up</Link>
      <Link to='/login'>Log in</Link>
    </div>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
