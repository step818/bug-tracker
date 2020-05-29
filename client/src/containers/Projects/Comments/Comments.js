import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjectById } from '../../../actions/project';
import Spinner from '../../../hoc/Layout/Spinner';
import CommentSummary from './CommentSummary';

const Comments = ({ project: {project, loading}, getProjectById, match }) => {
  useEffect(() => {
    getProjectById(match.params.id);
  }, [getProjectById, match.params.id]);

  return (
    (project===null || loading ? (
      <Spinner/> 
      ) : (
        <Fragment>
          <h1>Comments</h1>
          <div>
          {project.comments.map(comment => {
            return (
              <CommentSummary comment={comment} userId={project.user} />
            );
          })}
        </div>
        </Fragment>
      ))
  );
};

Comments.propTypes = {
  project: PropTypes.object.isRequired,
  getProjectById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  project: state.project
});

export default connect( mapStateToProps, { getProjectById } )(Comments);
