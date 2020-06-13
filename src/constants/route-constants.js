export const ALL_ITEMS_ROUTE = '/all-items';
export const BID_DETAIL_ROUTE = '/item/:itemId/bid/:id';
export const DASHBOARD_ROUTE = '/';
export const EMAIL_CONFIRMATION_ROUTE = '/user/verification/:slug';
export const GROUP_BUYING_ITEMS_ROUTE = '/group-buying';
export const INDEX_ROUTE = '/';
export const INVITE_ROUTE = '/invite';
export const ITEM_DETAIL_ROUTE = '/item/:id';
export const LANDING_PAGE_ROUTE = '/landing-page';
export const LOGIN_ROUTE = '/login';
export const MY_ITEMS_ROUTE = '/my-items';
export const MY_TRANSACTIONS_ROUTE = '/my-transactions';
export const PROFILE_ROUTE = '/user';
export const REQUEST_ITEM_ROUTE = '/request';
export const SIGN_UP_ROUTE = '/signup';
export const TRANSACTION_DETAIL_ROUTE = '/transaction/:id';
export const SERVICE_UNAVAILABLE_ROUTE = '/500';

export const BID_DETAIL_URL = (itemId, bidId) => `/item/${itemId}/bid/${bidId}`;
export const ITEM_DETAIL_URL = (itemId) => `/item/${itemId}`;
export const TRANSACTION_DETAIL_URL = (transactionId) =>
  `/transaction/${transactionId}`;
