import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjectById } from '../../actions/project';
import Spinner from '../../hoc/Layout/Spinner';
import CommentSummary from '../Projects/Comments/CommentSummary';

const ProjectDetails = ({ 
  project: { project, loading },
  auth, 
  getProjectById,
  match 
}) => {
  useEffect(() => {
    getProjectById(match.params.id);
  }, [getProjectById, match.params.id]);

  return (
    (project === null || loading ? ( 
      <Spinner /> 
      ) : ( 
      <Fragment>
        <h2>Project Details</h2>
        <p>{project.text}</p>
        <p>Description: {project.description}</p>
        <p>{project.date}</p>

        
        
        <h3>Comments</h3>
        <p>{project.comments.length}</p>
        {project.comments.length > 0 && project.comments.map(comment => {
          return (
            <CommentSummary comment={comment} userId={project.user} />
          );
        })}
        {/* <Comments projectId={project._id}/> */}
      </Fragment>
      )
    )
  );
};


ProjectDetails.propTypes = {
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProjectById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(mapStateToProps, { getProjectById })(ProjectDetails);
