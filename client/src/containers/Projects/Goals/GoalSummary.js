import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const GoalSummary = ({ userId, auth, goal: { date, _id, title, priority, description, status, user } }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <b>Priority: {priority} / 10</b>
      <p>Status: {status}</p>

      {!auth.loading && userId === auth.user._id && (
          <button>
            Delete goal
          </button>
        )}
    </div>
  )
}

GoalSummary.propTypes = {
  auth: PropTypes.object.isRequired,
  goal: PropTypes.object,
  userId: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(GoalSummary);
