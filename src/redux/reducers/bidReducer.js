// IMPORTING CONSTANTS FROM CONSTANT FILE
import {
  BID_STATUS_CHANGE,
  BID_TRANSACTION,
  BIDS_LIST,
  CLEAR_BID_STATUS_CHANGE,
  CLEAR_PAYMENT,
  PLACED_BID,
  TOP_BIDS,
} from '../../constants/action-constants';

// INITIAL STATE OF STORE
const initialState = {
  bid: {},
  bidsList: {
    bids: [],
    list_size: 0,
  },
  topBids: {},
  payment: {},
  bidStatusChange: false,
};

const bidReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACED_BID:
      return {
        ...state,
        bid: action.data.bid,
      };

    case TOP_BIDS:
      return {
        ...state,
        topBids: action.data,
      };

    case CLEAR_BID_STATUS_CHANGE:
      return {
        ...state,
        bidStatusChange: false,
      };

    case BID_STATUS_CHANGE:
      return {
        ...state,
        bidStatusChange: true,
      };

    case BIDS_LIST:
      return {
        ...state,
        bidsList: {
          bids: action.data.bids,
          list_size: action.data.meta.total_count,
        },
      };

    case BID_TRANSACTION:
      return {
        ...state,
        payment: action.data,
      };

    case CLEAR_PAYMENT:
      return {
        ...state,
        payment: {},
      };

    // DEFAULT CASE
    default:
      return state;
  }
};

export default bidReducer;
