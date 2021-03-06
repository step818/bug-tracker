import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROJECTS,
  GET_PROJECT,
  PROJECT_ERROR,
  UPDATE_LIKES,
  DELETE_PROJECT,
  ADD_PROJECT,
  ADD_COMMENT,
  DELETE_COMMENT,
  ADD_GOAL,
  DELETE_GOAL,
  GOAL_DONE_UPDATE
} from './types';

// Get projects
export const getProjects = () => async dispatch => {
  try {
    const res = await axios.get('/api/projects');

    dispatch({
      type: GET_PROJECTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get project by ID
export const getProjectById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/projects/${id}`);

    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const addLike = projId => async dispatch => {
  try {
    const res = await axios.put(`/api/projects/like/${projId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { projId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = projId => async dispatch => {
  try {
    const res = await axios.put(`/api/projects/unlike/${projId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { projId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Project
export const deleteProject = projId => async dispatch => {
  try {
    await axios.delete(`/api/projects/${projId}`);

    dispatch({
      type: DELETE_PROJECT,
      payload: projId
    });

    dispatch(setAlert('Project has been removed'));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Project
export const addProject = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/projects', formData, config);

    dispatch({
      type: ADD_PROJECT,
      payload: res.data
    });

    dispatch(setAlert('Project has been added'));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Comment
export const addComment = (projId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(`/api/projects/comment/${projId}`, formData, config);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    
    dispatch(setAlert('Comment added'));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Comment
export const deleteComment = (projId, commentId) => async dispatch => {

  try {
    await axios.delete(`/api/projects/comment/${projId}/${commentId}`);

    dispatch({
      type: DELETE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment deleted'));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Goal to a Project
export const addGoal = (projId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(`/api/projects/goal/${projId}`, formData, config);

    dispatch({
      type: ADD_GOAL,
      payload: res.data
    });

    dispatch(setAlert('Goal added'));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Goal
export const deleteGoal = (projId, goalId) => async dispatch => {

  try {
    await axios.delete(`/api/projects/goal/${projId}/${goalId}`);

    dispatch({
      type: DELETE_GOAL,
      payload: goalId
    });

    dispatch(setAlert('Goal deleted'));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Complete goal switch
export const completeGoal = (projId, goalId) => async dispatch => {
  try {
    const res = await axios.put(`/api/projects/goal/done/${projId}/${goalId}`);

    dispatch({
      type: GOAL_DONE_UPDATE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
