import {
  MY_TRANSACTIONS_URL,
  TRANSACTION_URL,
} from '../constants/action-constants';
import { defaultHeader } from '../utils';

export const getMyTransactionsService = (page) => {
  return fetch(MY_TRANSACTIONS_URL(page), {
    method: 'GET',
    headers: defaultHeader(),
  });
};

export const getTransactionDetail = (id) => {
  return fetch(TRANSACTION_URL(id), {
    method: 'GET',
    headers: defaultHeader(),
  });
};
