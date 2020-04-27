import React, { Component } from 'react';
import ProjectList from './ProjectList';
import { Link } from 'react-router-dom';

class Projects extends Component {
  state = {
    projects: [{
      id: 0,
      name: "Money Tree Growth"
    },{
      id: 1,
      name: "Rise to the top"
    },{
      id: 2,
      name: "Physical Health"
    },{
      id: 3,
      name: "One with nature"
    }]
  }
  render(){
    const { projects } = this.state;
    return(
      <div>
        <ProjectList projects={projects} />
        
        <Link to="/addProject">Add Project</Link>
      </div>
    );
  }
};

export default Projects;