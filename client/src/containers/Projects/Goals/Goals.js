import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoalSummary from './GoalSummary';
import { getProjectById } from '../../../actions/project';
import Spinner from '../../../hoc/Layout/Spinner';
import AddGoal from './AddGoal';

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
        <AddGoal projId={project._id} />
        <div>
          {project.goals.length > 0 ? ( 
            project.goals.map(goal => {
              return (
                <GoalSummary goal={goal} userId={project.user} />
              );
          })) : (
            <div>No goals added yet.</div>
          )}
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
