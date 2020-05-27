import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div>
        <Link to="/edit-profile">
          <i>Edit Profile</i> 
        </Link>
      </div>
  );
};

export default DashboardActions;