import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CommentSummary = ({ 
  comment: { date, _id, text, firstName, lastName, avatar, user }, 
  userId, auth }) => {
  return (
    <div>
      <div>
        <h4>Comment Summary</h4>
      </div>
      <p>{firstName} {lastName}</p>
      <p>Comment: {text}</p>
      <p>commented on: {date}</p>
      {!auth.loading && user === auth.user._id && (
          <button type='button'>
            Delete Comment
          </button>
        )}
    </div>
  )
}

CommentSummary.propTypes = {
  comment: PropTypes.object.isRequired,
  userId: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect( mapStateToProps, {})(CommentSummary);
