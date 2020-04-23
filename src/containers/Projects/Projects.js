import React, { Component } from 'react';
import ProjectList from './ProjectList';
import { Link } from 'react-router-dom';

class Projects extends Component {
  render(){
    return(
      <div>
        <ProjectList />
        
        <Link to="/addProject">Add Project</Link>
      </div>
    );
  }
};

export default Projects;