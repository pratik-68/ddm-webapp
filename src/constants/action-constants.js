const BASE_URL = 'http://localhost:3001/api/v1';

export const ALL_ITEMS_URL = (page) => `${BASE_URL}/items?page=${page}`;
export const BID_URL = (itemId, bidId) =>
  `${BASE_URL}/item/${itemId}/bid/${bidId}`;
export const BID_PLACE_URL = (itemId) => `${BASE_URL}/item/${itemId}/bid`;
export const CREATE_GROUP_BUY_ITEM_URL = (itemId) =>
  `${BASE_URL}/group-buying/item/${itemId}`;
export const BIDS_LIST_URL = (itemId, page) =>
  `${BASE_URL}/item/${itemId}/bid?page=${page}`;
export const GROUP_BUYING_URL = (page) =>
  `${BASE_URL}/group_buyings?page=${page}`;
export const ITEM_URL = (itemId) => `${BASE_URL}/items/${itemId}`;
export const MY_ITEMS_URL = (page) => `${BASE_URL}/user/items?page=${page}`;
export const MY_GROUP_ITEMS_URL = (page) =>
  `${BASE_URL}/user/group_buyings?page=${page}`;
export const MY_TRANSACTIONS_URL = (page) => `${BASE_URL}/charge?page=${page}`;
export const PLACE_BID_SUCCESS_URL = (id) => `${BASE_URL}/charge/${id}`;
export const REJECT_BID_URL = (itemId, bidId) =>
  `${BASE_URL}/item/${itemId}/reject/bid/${bidId}`;
export const LIKE_BID_URL = (itemId, bidId) =>
  `${BASE_URL}/item/${itemId}/like/bid/${bidId}`;
export const SIGNUP_URL = (token) => `${BASE_URL}/auth/signup/${token}`;
export const TRANSACTION_URL = (transactionId) =>
  `${BASE_URL}/transaction/${transactionId}`;
export const TOP_BIDS_URL = (itemId) => `${BASE_URL}/item/${itemId}/top-bids`;

export const CREATE_ITEM_URL = `${BASE_URL}/items`;
export const INVITE_URL = `${BASE_URL}/invites`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const SIGNUP_EMAIL_URL = `${BASE_URL}/auth/email/verification`;
export const USER_URL = `${BASE_URL}/users`;

export const AUTHORIZED_USER = 'AUTHORIZED_USER';
export const BIDS_LIST = 'BIDS_LIST';
export const BID_STATUS_CHANGE = 'BID_STATUS_CHANGE';
export const BID_TRANSACTION_COMPLETE = 'BID_TRANSACTION_COMPLETE';
export const BID_TRANSACTION = 'BID_TRANSACTION';
export const CLEAR_BID_STATUS_CHANGE = 'CLEAR_BID_STATUS_CHANGE';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const CLEAR_SERVICE_UNAVAILABLE = 'CLEAR_SERVICE_UNAVAILABLE';
export const CLEAR_NOT_FOUND = 'CLEAR_NOT_FOUND';
export const CLEAR_PAYMENT = 'CLEAR_PAYMENT';
export const CLEAR_SUCCESS = 'CLEAR_SUCCESS';
export const EMAIL_VERIFICATION = 'EMAIL_VERIFICATION';
export const ERROR = 'ERROR';
export const GET_USER = 'GET_USER';
export const GROUP_BUYING_ITEMS_LIST = 'GROUP_BUYING_ITEMS_LIST';
export const ITEM_CREATED = 'ITEM_CREATED';
export const ITEM_DATA = 'ITEM_DATA';
export const ITEMS_LIST = 'ITEMS_LIST';
export const LOAD_USER = 'LOAD_USER';
export const MY_ITEMS = 'MY_ITEMS';
export const MY_GROUP_BUYING_ITEMS = 'MY_GROUP_BUYING_ITEMS';
export const NOT_FOUND = 'NOT_FOUND';
export const PLACED_BID = 'PLACED_BID';
export const SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE';
export const STRIPE_PUBLIC_KEY = 'pk_test_TPTRtTkPfnn1xAOF5gJiOjZJ00mgdhejE5';
export const STRIPE_SUCCESS_MESSAGE = 'succeeded';
export const SUCCESS = 'SUCCESS';
export const TRANSACTION_DATA = 'TRANSACTION_DATA';
export const TRANSACTION_LIST = 'TRANSACTION_LIST';
export const TOP_BIDS = 'TOP_BIDS';
export const UNAUTHORIZED_USER = 'UNAUTHORIZED_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const USER_ERROR = 'USER_ERROR';
export const USER_ERROR_MESSAGE_CLEAR = 'USER_ERROR_MESSAGE_CLEAR';
export const USER_LOGOUT = 'USER_LOGOUT';
