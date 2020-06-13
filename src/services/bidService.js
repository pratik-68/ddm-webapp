import {
  BID_URL,
  TOP_BIDS_URL,
  BID_PLACE_URL,
  PLACE_BID_SUCCESS_URL,
  BIDS_LIST_URL,
  REJECT_BID_URL,
  LIKE_BID_URL,
} from '../constants/action-constants';
import { defaultHeader } from '../utils';

export const getBidDetailsService = (itemId, bidId) => {
  return fetch(BID_URL(itemId, bidId), {
    method: 'GET',
    headers: defaultHeader(),
  });
};

export const getBidsListService = (itemId, page) => {
  return fetch(BIDS_LIST_URL(itemId, page), {
    method: 'GET',
    headers: defaultHeader(),
  });
};

export const getTopBidsService = (item_id) => {
  return fetch(TOP_BIDS_URL(item_id), {
    method: 'GET',
    headers: defaultHeader(),
  });
};

export const placeBidService = (details) => {
  // let data = new FormData();
  // data.append("images", details.images);
  // data.append("descriptions", details.descriptions.values);
  return fetch(BID_PLACE_URL(details.item_id), {
    method: 'POST',
    // headers: {
    // 'Content-Type': 'multipart/form-data',
    // "Content-Type": "application/json",
    // Accept: "application/json",
    //     token: getToken()
    // },
    // body: ({bid: data})
    headers: defaultHeader(),
    body: JSON.stringify({
      bid: {
        amount: parseFloat(details.amount),
        name: details.title,
        descriptions: details.descriptions.values,
      },
    }),
  });
};

export const placeBidSuccessService = (details) => {
  return fetch(PLACE_BID_SUCCESS_URL(details.result.paymentIntent.id), {
    method: 'PATCH',
    headers: defaultHeader(),
    body: JSON.stringify({
      response: details.response,
      transaction: details.transaction,
    }),
  });
};

export const rejectBid = (itemId, bidId) => {
  return fetch(REJECT_BID_URL(itemId, bidId), {
    method: 'PATCH',
    headers: defaultHeader(),
    body: JSON.stringify({
      reject: true,
      item_id: itemId,
      bid_id: bidId,
    }),
  });
};

export const likeBid = (itemId, bidId) => {
  return fetch(LIKE_BID_URL(itemId, bidId), {
    method: 'PATCH',
    headers: defaultHeader(),
    body: JSON.stringify({
      like: true,
      item_id: itemId,
      bid_id: bidId,
    }),
  });
};
