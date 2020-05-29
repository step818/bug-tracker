import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../hoc/Layout/Spinner';
import { getProjects } from '../../actions/project';
import ProjectSummary from './ProjectSummary';

const Projects = ({ project: { projects, loading }, getProjects, auth }) => {
  useEffect(()=> {
    getProjects();
  },[getProjects]);

  return (
    (projects === null || loading ? ( 
      <Spinner /> 
      ) : (
      <Fragment>
        <h1>Projects</h1>
        <p>Welcome to the community</p>
        <div>
          {projects.map(proj => {
            // Only display projects from that user
            // if(proj.user === auth.user._id) {
            return(
              <ProjectSummary project={proj}></ProjectSummary>
              // <div key={proj._id}>
              //   <p>Text: {proj.lastName}</p>
              //  <p> Likes: {proj.likes}</p>
              // </div>)
            // );} else {
            //   return(<div></div>);
            // }
            )}
        )}
        </div>
        {/* Add Project */}
      </Fragment>)
    )
  )
}

Projects.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
});

export default connect(mapStateToProps, { getProjects })(Projects);
