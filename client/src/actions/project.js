import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROJECTS,
  PROJECT_ERROR,
  UPDATE_LIKES
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