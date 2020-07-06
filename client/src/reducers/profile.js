import { 
  GET_PROFILE, 
  GET_PROFILES, 
  GET_REPOS, 
  PROFILE_ERROR, 
  CLEAR_PROFILE,
  ADD_FRIEND,
  SEND_REQUEST,
  GET_FRIEND_REQUESTS,
  REMOVE_REQUEST
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
}

export default function(state = initialState, action) {
  const { type, payload} = action;

  switch(type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case GET_FRIEND_REQUESTS:
      return {
        ...state,
        loading: false,
        profiles: {
          ...state.profiles,
          
        },
      };
    case ADD_FRIEND:
      return {
        ...state,
        profiles: state.profiles.map(
          prof => prof.user._id === payload.friend_id ? {
            ...prof,
            friends: payload.friends
          } : prof ),
        loading: false
      };
    case SEND_REQUEST:
      return {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          requests: payload.requests
        }
      };
    case REMOVE_REQUEST:
      return {
        ...state,
        profile: state.profile.requests.filter(
          reQu => reQu.profile === payload.request_id),
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    default:
      return state;
  }
};