import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deleteProject } from '../../actions/project';

const ProjectSummary = ({
  addLike, removeLike,
  deleteProject,
  auth, project: { 
    _id, text, description, firstName, lastName, avatar, user, date, 
    likes, goals, team, comments 
  }
}) => {

  return(
    <Fragment key={_id}>
      <Link to={`/profile/${user}`}>
        <div>
            <img src={avatar} alt='' />
          <h4>{firstName} {lastName}</h4>
        </div>
      </Link>
      <p>---------------</p>
      <Link to={`/project/${_id}`}>
      <div>
        <p>Title: {text}</p>
        {description && 
          <p>Description: {description}</p>
        }
        <p>Posted on {date}</p>
      </div>
      </Link>
      <div>
        <button type='button' onClick={e => addLike(_id)}>
          Like {likes.length > 0 && (
          <span>{likes.length}</span>)}
        </button>
        <button type='button' onClick={e => removeLike(_id)}>
          Remove like
        </button>
          <Link to={`/project/comments/${_id}`}>
            Comments {comments.length > 0 && (
              <span>{comments.length}</span>
            )}
          </Link>
          <Link to={`/project/goal/${_id}`}>
            Goals <span>{goals.length}</span>
          </Link>
          <Link to={`/project/team/${_id}`}>
            Team <span>{team.length}</span>
          </Link>
        {!auth.loading && user === auth.user._id && (
          <button type='button' onClick={e => deleteProject(_id)}>
            Delete Project
          </button>
        )}
      </div>
    </Fragment>

  );
}

ProjectSummary.propTypes = {
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps, { addLike, removeLike, deleteProject })(ProjectSummary);