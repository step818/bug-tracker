import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjectById } from '../../actions/project';
import Spinner from '../../hoc/Layout/Spinner';
import CommentSummary from '../Projects/Comments/CommentSummary';
import TeamMateSummary from '../Team/TeamMateSummary';
import GoalSummary from './Goals/GoalSummary';
import { Link } from 'react-router-dom';
import CommentForm from './Comments/CommentForm';
import AddGoal from '../Projects/Goals/AddGoal';

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
    ( project === null || loading ? ( 
      <Spinner /> 
      ) : ( 
      <Fragment>
        <h2>Project Details</h2>
        <p>{project.text}</p>
        {project.description && <p>Description: {project.description}</p>}
        <p>{project.date}</p>

        <Link to={'/projects'}>
          <div>Back to projects</div>
        </Link>

        <h3>Goals</h3>
        <AddGoal projId={project._id} />
        <div>
          {project.goals && project.goals.length > 0 ? ( 
            project.goals.map(goal => {
              return (
                <GoalSummary key={goal._id} goal={goal} userId={project.user} />
              );
          })) : (
            <div>No goals added yet.</div>
          )}
        </div>


        <h3>Team</h3>
        <div>
          {project.team && project.team.length > 0 ? (
            project.team.map(mate => {
              return(
              <TeamMateSummary key={mate._id} mate={mate} />
            )})
          ):(
            <div>No team mates added yet.</div>
          )}
        </div>
        
        
        <h3>Comments</h3>
        <CommentForm projId={project._id} />
        <p>{project.comments && project.comments.length} comments</p>
        {project.comments && project.comments.length > 0 ? (
          project.comments.map(comment => {
            for(let i = 0; i < 5; i++){
              return (
                <CommentSummary key={comment._id} comment={comment} projId={project._id} userId={project.user} />
              );
            }
          })
        ) : (
          <div>No comments added yet.</div>
        ) }
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
