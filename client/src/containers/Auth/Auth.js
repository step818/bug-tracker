import React, { Component } from 'react';
import classes from './Auth.module.css';

class Auth extends Component {
  render(){
    return(
      <div className={classes.Auth}>
        Signin / Create account
      </div>
    );
  }
};

export default Auth;