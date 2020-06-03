import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteGoal } from '../../../actions/project';

const GoalSummary = ({ 
  projId, deleteGoal, userId, auth, 
  goal: { date, _id, title, done, priority, description, status, user } }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <b>Priority: {priority} / 10</b>
      <p>Status: {status}</p>
      <p>Completed: {!done ? (<span>False</span>) : (<span>True</span>)}</p>

      {!auth.loading && user === auth.user._id && (
          <button type='button' onClick={e => deleteGoal(projId, _id)}>
            Delete goal
          </button>
        )}
    </div>
  )
}

GoalSummary.propTypes = {
  auth: PropTypes.object.isRequired,
  goal: PropTypes.object.isRequired,
  userId: PropTypes.string,
  deleteGoal: PropTypes.func.isRequired,
  projId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteGoal })(GoalSummary);
