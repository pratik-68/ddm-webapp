// IMPORTING SERVICES FROM SERVICE FOLDER
import { getLoginData, removeToken } from '../../services/loginService';
// IMPORTING CONSTANTS FROM CONSTANT FILE
import {
  AUTHORIZED_USER,
  ERROR,
  USER_LOGOUT,
  SERVICE_UNAVAILABLE,
} from '../../constants/action-constants';
import { login, logout } from '../../utils';

// ACTION FOR ADDING LOGIN USER STATUS DETAILS
export const loginUser = (user) => (dispatch) => {
  getLoginData(user)
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          login(data.token);
          return dispatch({
            type: AUTHORIZED_USER,
          });
        });
      } else if (res.status === 400) {
        return res.json().then((data) => {
          return dispatch({
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

export const logoutUser = () => (dispatch) => {
  removeToken()
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          logout();
          dispatch({
            type: USER_LOGOUT,
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
