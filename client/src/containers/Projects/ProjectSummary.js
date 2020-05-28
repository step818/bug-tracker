import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions/project';

const ProjectSummary = ({
  addLike, removeLike,
  auth, project: { 
    _id, text, firstName, lastName, avatar, user, date, 
    likes, goals, team, comments 
  }
}) => {

  return(
    <Fragment>
      <div>
        <a>
          <img src={avatar} alt='' />
        </a>
        <h4>{firstName} {lastName}</h4>
      </div>
      <div>
        <p>{text}</p>
        <p>Posted on {date}</p>
        <button type='button' onClick={e => addLike(_id)}>
          Like {likes.length > 0 && (
          <span>{likes.length}</span>)}
        </button>
        <button type='button' onClick={e => removeLike(_id)}>
          Remove like
        </button>
          <Link to={`/project/${_id}`}>
            Discussion {comments.length > 0 && (
              <span>{comments.length}</span>
            )}
          </Link>
          <Link to={`/goal/${_id}`}>
            Goals <span>{goals.length}</span>
          </Link>
          <Link to={'/team'}>
            Team <span>{team.length}</span>
          </Link>
        {!auth.loading && user === auth.user._id && (
          <button type='button'>
            Delete comment
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
  removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps, { addLike, removeLike })(ProjectSummary);