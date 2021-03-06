import {
  GET_PROJECTS,
  GET_PROJECT,
  PROJECT_ERROR,
  UPDATE_LIKES,
  DELETE_PROJECT,
  ADD_PROJECT,
  DELETE_COMMENT,
  ADD_COMMENT,
  DELETE_GOAL,
  ADD_GOAL,
  GOAL_DONE_UPDATE
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
    case GET_PROJECT:
      return {
        ...state,
        project: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        projects: state.projects.map(
          proj => proj._id === payload.projId ? {
            ...proj, 
            likes: payload.likes
          } : proj ),
        loading: false
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        project: null
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [payload, ...state.projects],
        loading: false
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(proj => proj._id !== payload),
        loading: false
      };
    case ADD_GOAL:
      return{
        ...state,
        project : { 
          ...state.project, 
          goals: payload},
        loading: false
      };
    case DELETE_GOAL:
      return {
        ...state,
        project: {
          ...state.project,
          goals: state.project.goals.filter(
            goal => goal._id !== payload
          )
        },
        loading: false
      };
    case GOAL_DONE_UPDATE:
      return {
        ...state,
        project: {
          ...state.project,
          goals: payload
        },
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        project : { 
          ...state.project, 
          comments: payload},
        loading: false
      };
    case DELETE_COMMENT:
      return {
        ...state,
        project: {
          ...state.project,
          comments: state.project.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading:false
      }
    default:
      return state;
  }
}