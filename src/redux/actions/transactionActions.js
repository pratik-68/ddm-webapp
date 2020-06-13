import {
  ERROR,
  NOT_FOUND,
  TRANSACTION_DATA,
  TRANSACTION_LIST,
  UNAUTHORIZED_USER,
  SERVICE_UNAVAILABLE,
} from '../../constants/action-constants';
import {
  getMyTransactionsService,
  getTransactionDetail,
} from '../../services/transactionService';
import { logout } from '../../utils';

export const getMyTransactions = (page) => (dispatch) => {
  getMyTransactionsService(page)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          dispatch({
            type: TRANSACTION_LIST,
            data: data,
          });
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
        });
      } else {
        res.json().then((data) => {
          dispatch({
            type: ERROR,
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

export const getTransaction = (id) => (dispatch) => {
  getTransactionDetail(id)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          dispatch({
            type: TRANSACTION_DATA,
            data: data,
          });
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
        });
      } else if (res.status === 404) {
        res.json().then((data) => {
          dispatch({
            type: NOT_FOUND,
          });
        });
      } else {
        res.json().then((data) => {
          dispatch({
            type: ERROR,
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
