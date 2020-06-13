import {
  TRANSACTION_DATA,
  TRANSACTION_LIST,
} from '../../constants/action-constants';

const initialState = {
  transactionList: {
    transactions: [],
    total_item_count: 0,
  },
  transaction: {},
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION_LIST:
      return {
        ...state,
        transactionList: {
          transactions: action.data.transactions,
          total_item_count: action.data.meta.total_count,
        },
      };

    case TRANSACTION_DATA:
      return { ...state, transaction: action.data.transaction };
    default:
      return state;
  }
};

export default transactionReducer;
