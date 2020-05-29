import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../hoc/Layout/Spinner';
import { getProjectById } from '../../actions/project';
import TeamMateSummary from './TeamMateSummary';

const Team = ({
  auth, getProjectById, 
  project: { project, loading }, 
  match 
}) => {
    useEffect(() => {
      getProjectById(match.params.id);
    }, [getProjectById, match]);

  return (
    (project===null || loading ? (
      <Spinner />
    ) : (
      <Fragment>
        <h1>Team</h1>
        <h2>for <b>{project.text}</b></h2>
        <div>
          {project.team.length > 0 ? (
            project.team.map(mate => {
              return(
              <TeamMateSummary mate={mate} />
            )})
          ):(
            <div>No team mates added yet.</div>
          )}
        </div>
      </Fragment>
    ))
  );
};

Team.propTypes = {
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProjectById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
});

export default connect(mapStateToProps, { getProjectById })(Team);
