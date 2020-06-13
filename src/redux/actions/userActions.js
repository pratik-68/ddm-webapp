// IMPORTING USER SERVICES FROM SERVICE FOLDER
import {
  getUserData,
  inviteUserService,
  patchUserData,
} from '../../services/userService';
// IMPORTING CONSTANTS FROM CONSTANT FILE
import {
  CLEAR_ERROR,
  CLEAR_NOT_FOUND,
  CLEAR_SERVICE_UNAVAILABLE,
  CLEAR_SUCCESS,
  ERROR,
  GET_USER,
  LOAD_USER,
  SERVICE_UNAVAILABLE,
  SUCCESS,
  UNAUTHORIZED_USER,
  UPDATE_USER,
  USER_ERROR,
  USER_ERROR_MESSAGE_CLEAR,
} from '../../constants/action-constants';
import { getToken, logout } from '../../utils';

// ACTION FOR CLEARING ERROR
export const clearError = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};

export const clearServiceUnavailable = () => (dispatch) => {
  dispatch({
    type: CLEAR_SERVICE_UNAVAILABLE,
  });
};

// ACTION FOR CLEARING SUCCESS
export const clearSuccess = () => (dispatch) => {
  dispatch({
    type: CLEAR_SUCCESS,
  });
};

// ACTION FOR CLEARING NOT FOUND
export const clearNotFound = () => (dispatch) => {
  dispatch({
    type: CLEAR_NOT_FOUND,
  });
};

// ACTION FOR INVITE USER
export const inviteUser = (email) => (dispatch) => {
  inviteUserService(email)
    .then((res) => {
      if (res.status === 201) {
        dispatch({
          type: SUCCESS,
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
        });
      } else if (res.status === 400) {
        return res.json().then((data) => {
          dispatch({
            type: ERROR,
            error: data.error,
          });
        });
      } else {
        dispatch({
          type: SERVICE_UNAVAILABLE,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SERVICE_UNAVAILABLE,
      });
    });
};

export const userDetail = () => (dispatch) => {
  getUserData()
    .then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          dispatch({
            type: GET_USER,
            data: data,
          });
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
        });
      } else {
        return res.json().then((data) => {
          dispatch({
            type: USER_ERROR,
            error: data.error,
          });
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SERVICE_UNAVAILABLE,
      });
    });
};

export const updateUserDetail = (user) => (dispatch) => {
  patchUserData(user)
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          dispatch({
            type: UPDATE_USER,
            data: data,
          });
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
        });
      } else {
        return res.json().then((data) => {
          dispatch({
            type: USER_ERROR,
            error: data.error,
          });
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SERVICE_UNAVAILABLE,
      });
    });
};

export const clearUserMessage = () => (dispatch) => {
  dispatch({
    type: USER_ERROR_MESSAGE_CLEAR,
  });
};

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch) => {
  const token = getToken();
  if (token) {
    getUserData()
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((data) => {
            dispatch({
              type: LOAD_USER,
              data: data,
            });
          });
        } else if (res.status === 401) {
          return res.json().then((data) => {
            logout();
            dispatch({
              type: UNAUTHORIZED_USER,
            });
          });
        } else {
          dispatch({
            type: SERVICE_UNAVAILABLE,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: SERVICE_UNAVAILABLE,
        });
      });
  } else {
    dispatch({
      type: UNAUTHORIZED_USER,
    });
  }
};
