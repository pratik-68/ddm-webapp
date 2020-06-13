// IMPORTING CONSTANTS FROM CONSTANT FILE
import {
  AUTHORIZED_USER,
  CLEAR_ERROR,
  CLEAR_NOT_FOUND,
  CLEAR_SERVICE_UNAVAILABLE,
  CLEAR_SUCCESS,
  ERROR,
  GET_USER,
  LOAD_USER,
  NOT_FOUND,
  SERVICE_UNAVAILABLE,
  SUCCESS,
  UNAUTHORIZED_USER,
  UPDATE_USER,
  USER_ERROR,
  USER_ERROR_MESSAGE_CLEAR,
} from '../../constants/action-constants';

// INITIAL STATE OF STORE
const initialState = {
  serviceUnavailable: false,
  error: {},
  success: false,
  data: {},
  userError: {},
  user: {},
  authorizedUser: null,
  successMessage: false,
  notFound: false,
};

// REDUCER FOR UPDATING THE CENTRAL STORE
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        error: action.error,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: {},
      };

    case SERVICE_UNAVAILABLE:
      return {
        ...state,
        serviceUnavailable: true,
      };

    case NOT_FOUND:
      return {
        ...state,
        notFound: true,
      };

    case CLEAR_NOT_FOUND:
      return {
        ...state,
        notFound: false,
      };

    case LOAD_USER:
      return {
        ...state,
        authorizedUser: true,
        user: action.data.user,
      };

    case SUCCESS:
      return {
        ...state,
        success: true,
      };

    case CLEAR_SUCCESS:
      return {
        ...state,
        success: false,
      };

    case GET_USER:
      return { ...state, user: action.data.user };

    case UPDATE_USER:
      return { ...state, user: action.data.user, successMessage: true };

    case AUTHORIZED_USER:
      return { ...state, authorizedUser: true };

    case UNAUTHORIZED_USER:
      return { ...state, authorizedUser: false };

    case USER_ERROR:
      return { ...state, userError: action.error };

    case CLEAR_SERVICE_UNAVAILABLE:
      return { ...state, serviceUnavailable: false };

    case USER_ERROR_MESSAGE_CLEAR:
      return { ...state, userError: [], successMessage: false };

    // DEFAULT CASE
    default:
      return state;
  }
};

export default userReducer;
