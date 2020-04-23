import React, { Component } from 'react';
import TeamList from './TeamList';
import { Link } from 'react-router-dom';

class Team extends Component {
  render() {
    return(
      <div>
        Welcome to the Team page!
        <TeamList />
        <Link to="/addMember">Add Member</Link>
      </div>
    );
  }
}

export default Team;