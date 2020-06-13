import {
  getBidDetailsService,
  getBidsListService,
  likeBid,
  placeBidService,
  placeBidSuccessService,
  rejectBid,
} from '../../services/bidService';
import {
  BID_STATUS_CHANGE,
  BID_TRANSACTION,
  BIDS_LIST,
  CLEAR_BID_STATUS_CHANGE,
  CLEAR_PAYMENT,
  ERROR,
  NOT_FOUND,
  PLACED_BID,
  UNAUTHORIZED_USER,
  SERVICE_UNAVAILABLE,
} from '../../constants/action-constants';
import { logout } from '../../utils';

export const getBidDetails = (itemId, bidId) => (dispatch) => {
  getBidDetailsService(itemId, bidId)
    .then((res) => {
      switch (res.status) {
        case 200:
          return res
            .json()
            .then((data) => {
              dispatch({
                type: PLACED_BID,
                data: data,
              });
            })
            .catch((err) => {
              dispatch({
                type: SERVICE_UNAVAILABLE,
              });
            });

        case 401:
          logout();
          dispatch({
            type: UNAUTHORIZED_USER,
          });
          break;

        case 404:
          dispatch({
            type: NOT_FOUND,
          });
          break;

        // DEFAULT CASE
        default:
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

export const placeBidRequest = (bid) => (dispatch) => {
  placeBidService(bid)
    .then((res) => {
      switch (res.status) {
        case 201:
          return res
            .json()
            .then((data) => {
              dispatch({
                type: BID_TRANSACTION,
                data: data,
              });
            })
            .catch((err) => {
              dispatch({
                type: SERVICE_UNAVAILABLE,
              });
            });

        case 401:
          logout();
          dispatch({
            type: UNAUTHORIZED_USER,
          });
          break;

        case 400:
          return res
            .json()
            .then((data) => {
              dispatch({
                type: ERROR,
                error: data.error,
              });
            })
            .catch((err) => {
              dispatch({
                type: SERVICE_UNAVAILABLE,
              });
            });

        // DEFAULT CASE
        default:
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

export const placeBidRequestSuccess = (bid) => () => {
  placeBidSuccessService(bid);
};

export const getTopBids = (item_id) => (dispatch) => {
  // getTopBidsService(item_id)
  //     .then(res => {
  //         if (res.status === 200) {
  //             return res
  //                 .json()
  //                 .then(data => {
  //                     dispatch({
  //                         type: TOP_BIDS,
  //                         data: data
  //                     });
  //                 })
  //                 .catch(err => {
  //                     return err;
  //                 });
  //         } else if (res.status === 401) {
  //             logout();
  //             dispatch({
  //                 type: UNAUTHORIZED_USER
  //             });
  //         } else {
  //             return res
  //                 .json()
  //                 .then(data => {
  //                     dispatch({
  //                         type: ERROR,
  //                         error: data.error
  //                     });
  //                 })
  //                 .catch(err => {
  //                     return err;
  //                 });
  //         }
  //     })
  //     .catch(error => {
  //         return error;
  //     });
};

export const clearPayment = () => (dispatch) => {
  dispatch({
    type: CLEAR_PAYMENT,
  });
};

export const getBidsList = (itemId, page = 1) => (dispatch) => {
  getBidsListService(itemId, page)
    .then((res) => {
      if (res.status === 200) {
        return res
          .json()
          .then((data) => {
            dispatch({
              type: BIDS_LIST,
              data: data,
            });
          })
          .catch((err) => {
            dispatch({
              type: SERVICE_UNAVAILABLE,
            });
          });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
        });
      } else {
        return res
          .json()
          .then((data) => {
            dispatch({
              type: ERROR,
              error: data.error,
            });
          })
          .catch((err) => {
            dispatch({
              type: SERVICE_UNAVAILABLE,
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

// ACTION FOR CLEARING REJECTED BID STATE
export const clearBidStatusChange = () => (dispatch) => {
  dispatch({
    type: CLEAR_BID_STATUS_CHANGE,
  });
};

export const rejectPlacedBid = (itemId, bidId) => (dispatch) => {
  rejectBid(itemId, bidId)
    .then((res) => {
      if (res.status === 200) {
        return res
          .json()
          .then((data) => {
            dispatch({
              type: BID_STATUS_CHANGE,
            });
          })
          .catch((err) => {
            dispatch({
              type: SERVICE_UNAVAILABLE,
            });
          });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
        });
      } else {
        return res
          .json()
          .then((data) => {
            dispatch({
              type: ERROR,
              error: data.error,
            });
          })
          .catch((err) => {
            dispatch({
              type: SERVICE_UNAVAILABLE,
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

export const likePlacedBid = (itemId, bidId) => (dispatch) => {
  likeBid(itemId, bidId)
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          dispatch({
            type: BID_STATUS_CHANGE,
          });
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
        });
      } else {
        return res.json().then((data) => {
          dispatch({
            type: ERROR,
            error: data.error,
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
