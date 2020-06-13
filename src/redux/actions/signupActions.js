// IMPORTING SIGNUP SERVICES FROM SERVICE FOLDER
import {
  addSignupEmailService,
  addSignupUserService,
  emailVerificationService,
} from '../../services/signupService';
// IMPORTING CONSTANTS FROM CONSTANT FILE
import {
  EMAIL_VERIFICATION,
  ERROR,
  SUCCESS,
  SERVICE_UNAVAILABLE,
} from '../../constants/action-constants';

// ACTION FOR SIGNUP USER DETAILS
export const addSignupUser = (user, slug) => (dispatch) => {
  addSignupUserService(user, slug)
    .then((res) => {
      if (res.status === 201) {
        dispatch({
          type: SUCCESS,
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

// ACTION FOR EMAIL CONFIRMATION LINK VERIFICATION
export const addUserVerification = (slug) => (dispatch) => {
  emailVerificationService(slug)
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          dispatch({
            type: EMAIL_VERIFICATION,
            data: data,
          });
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

export const addSignupEmail = (email) => (dispatch) => {
  addSignupEmailService(email)
    .then((res) => {
      if (res.status === 201) {
        dispatch({
          type: SUCCESS,
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
