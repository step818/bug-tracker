import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../hoc/Layout/Spinner';
import { getProjects } from '../../actions/project';
import ProjectSummary from './ProjectSummary';
import AddProject from './AddProject';

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
        <div>
        
          <p>Welcome to the community</p>
        </div>
        <div>
          <AddProject />
        </div>
        <div>
          {projects.map(proj => {
            // @TODO Optional after testing.
            // Only display projects from that user
            // and from friends
            if(proj.user === auth.user._id) {
              return(
                <ProjectSummary key={proj._id} project={proj} />
              );
            }
          }
        )}
        </div>
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
