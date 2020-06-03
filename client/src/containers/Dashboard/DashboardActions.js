import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div>
        <h4>Dashboard Actions</h4>
        <Link to="/edit-profile">
          <p>Edit Profile</p> 
        </Link>
      </div>
  );
};

export default DashboardActions;