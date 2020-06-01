import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../../actions/project';
import { Link } from 'react-router-dom';

const CommentSummary = ({ 
  comment: { date, _id, text, firstName, lastName, avatar, user }, 
  userId, projId, auth, deleteComment }) => {
  return (
    <div>
      <div>
        <h4>Comment Summary</h4>
      </div>
      <Link to={`/profile/${user}`}>
        <p>{firstName} {lastName}</p>
      </Link>
      <p>Comment: {text}</p>
      <p>commented on: {date}</p>
      <Link to={`/profile/${user}`}>
        View Profile
      </Link>
      {!auth.loading && user === auth.user._id && (
          <button onClick={e => deleteComment(projId, _id)} type='button'>
            Delete Comment
          </button>
        )}
    </div>
  )
}

CommentSummary.propTypes = {
  comment: PropTypes.object.isRequired,
  userId: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  projId: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect( mapStateToProps, { deleteComment })(CommentSummary);
