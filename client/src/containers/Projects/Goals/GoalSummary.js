import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteGoal, completeGoal } from '../../../actions/project';
import { addPoints } from '../../../actions/auth';

const GoalSummary = ({ 
  projId, deleteGoal, completeGoal, addPoints, auth, 
  goal: { date, _id, title, done, priority, description, status, user } }) => {
    const completeGoalReward = 2;
    const unDoGoalReward = -2;

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <b>Priority: {priority} / 10</b>
      <p>Status: {status}</p>

      <p>Completed: {!done ? (<span>False</span>) : (<span>True</span>)}</p>
      <span type='button' onClick={e => {
          if(!done){addPoints(auth.user._id, completeGoalReward); completeGoal(projId, _id);}
          else { addPoints(auth.user._id, unDoGoalReward); completeGoal(projId, _id);}
          }}>
        Done!
      </span>
      
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
  completeGoal: PropTypes.func.isRequired,
  addPoints: PropTypes.func.isRequired,
  projId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteGoal, completeGoal, addPoints })(GoalSummary);
