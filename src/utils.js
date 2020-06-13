import Cookies from 'universal-cookie';
import {
  BOTH,
  BUYER,
  REJECTED,
  SELLER,
  TOKEN_KEY,
} from './constants/common-constants';

export const isLogin = () => {
  const cookie = new Cookies();
  return !!cookie.get(TOKEN_KEY);
};

export const login = (token) => {
  const cookies = new Cookies();
  cookies.set(TOKEN_KEY, token, {
    path: '/',
    expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
  });
};

export const logout = () => {
  const cookie = new Cookies();
  cookie.remove(TOKEN_KEY, { path: '/' });
};

export const getToken = () => {
  const cookie = new Cookies();
  return cookie.get(TOKEN_KEY);
};

export const isBuyer = (type_of_user) => {
  return type_of_user === BOTH || type_of_user === BUYER;
};

export const isSeller = (type_of_user) => {
  return type_of_user === SELLER || type_of_user === BOTH;
};

export const to_Time = (DateTime) => {
  return new Date(DateTime).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });
};

export const to_Date = (date) => {
  return new Date(date).toLocaleDateString();
};

export const to_DateTime = (date) => {
  const DateTime = to_Time(date) + ' ' + to_Date(date);
  return DateTime;
};

export const defaultHeader = () => {
  return {
    'Content-Type': 'application/json',
    token: getToken(),
  };
};

export const defaultHeaderWithoutToken = () => {
  return {
    'Content-Type': 'application/json',
  };
};

export const isRejected = (status) => {
  return status === REJECTED;
};
