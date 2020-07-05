import React from 'react';
import { Link } from 'react-router-dom';
import classes from './DashboardActions.module.css';

const DashboardActions = () => {
  return (
    <div className={classes.DashboardActions}>
        <h4>Dashboard Actions</h4>
        <Link to="/edit-profile">
          <p>Edit Profile</p> 
        </Link>
        <Link to="/friends">
          <p>Friends</p>
        </Link>
      </div>
  );
};

export default DashboardActions;