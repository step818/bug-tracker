import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoalSummary from './GoalSummary';
import { getProjectById } from '../../../actions/project';
import Spinner from '../../../hoc/Layout/Spinner';

const Goals = ({ project: { project, loading }, auth, getProjectById, match }) => {
  useEffect(() => {
    getProjectById(match.params.id);
  }, [getProjectById, match.params.id]);

  return (
    (project===null || loading ? (
      <Spinner />
    ) : (
      <Fragment>
        <h1>Goals</h1>
        <div>
          {project.goals.map(goal => {
            if (auth.user._id===project.user) {
              return (
                <GoalSummary goal={goal} userId={project.user} />
              );
            } else {
              return (
                <div></div>
              );
            }
          })}
        </div>
      </Fragment>
    ))
  )
}

Goals.propTypes = {
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProjectById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
});

export default connect( mapStateToProps, { getProjectById })(Goals);
