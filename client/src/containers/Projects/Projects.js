import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../hoc/Layout/Spinner';
import { getProjects } from '../../actions/project';

const Projects = ({ project: { projects, loading }, getProjects }) => {
  useEffect(()=> {
    getProjects();
  },[getProjects]);

  return (
    <div>
      Projects
    </div>
  )
}

Projects.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  project: state.project
});

export default connect(mapStateToProps, { getProjects })(Projects);
