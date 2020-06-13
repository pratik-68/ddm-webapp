// IMPORTING CONSTANTS LINKS FROM CONSTANT FILE
import { SIGNUP_EMAIL_URL, SIGNUP_URL } from '../constants/action-constants';
import { defaultHeaderWithoutToken } from '../utils';

export const addSignupUserService = (user, slug) => {
  return fetch(SIGNUP_URL(slug), {
    method: 'POST',
    headers: defaultHeaderWithoutToken(),
    body: JSON.stringify({ user: user }),
  });
};

export const addSignupEmailService = (email) => {
  return fetch(SIGNUP_EMAIL_URL, {
    method: 'POST',
    headers: defaultHeaderWithoutToken(),
    body: JSON.stringify({ user: { email: email } }),
  });
};

export const emailVerificationService = (slug) => {
  return fetch(SIGNUP_URL(slug), {
    method: 'GET',
    headers: defaultHeaderWithoutToken(),
  });
};
