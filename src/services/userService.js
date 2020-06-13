// IMPORTING CONSTANTS LINKS FROM CONSTANT FILE
import { INVITE_URL, USER_URL } from '../constants/action-constants';
import { defaultHeader } from '../utils';

export const inviteUserService = (email) => {
  return fetch(INVITE_URL, {
    method: 'POST',
    headers: defaultHeader(),
    body: JSON.stringify({ invite: { email: email } }),
  });
};

export const getUserData = () => {
  return fetch(USER_URL, {
    method: 'GET',
    headers: defaultHeader(),
  });
};

export const patchUserData = (user) => {
  return fetch(USER_URL, {
    method: 'PATCH',
    headers: defaultHeader(),
    body: JSON.stringify({
      userData: user,
      password: { old_password: user.old_password },
    }),
  });
};
