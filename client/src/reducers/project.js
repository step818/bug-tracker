import {
  GET_PROJECTS,
  PROJECT_ERROR,
  UPDATE_LIKES
} from '../actions/types';

const initialState = {
  projects: [],
  project: null,
  loading: true,
  error: {}
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        projects: state.projects.map(
          proj => proj._id === payload.projId ? {
            ...proj, 
            likes: payload.likes
          } : proj),
        loading: false
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        project: null
      };
    default:
      return state;
  }
}