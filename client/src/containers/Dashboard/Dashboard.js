import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dashboard extends Component {
  render(){
    return(
      <div>
        chart of Issues by priority.
        chart of Issues by status.
        chart of Issues by type.
      </div>
    );
  }
};

Dashboard.propTypes = {};

export default Dashboard;