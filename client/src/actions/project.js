import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROJECTS,
  PROJECT_ERROR
} from './types';

// Get user's projects
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
      payload: {  msg: err.response.statusText, status: err.response.status }
    });
  }
};