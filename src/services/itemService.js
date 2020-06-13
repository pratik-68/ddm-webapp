import {
  ALL_ITEMS_URL,
  CREATE_ITEM_URL,
  ITEM_URL,
  MY_ITEMS_URL,
  GROUP_BUYING_URL,
  MY_GROUP_ITEMS_URL,
  CREATE_GROUP_BUY_ITEM_URL,
} from '../constants/action-constants';
import { defaultHeader } from '../utils';

export const getMyItems = (page) => {
  return fetch(MY_ITEMS_URL(page), {
    method: 'GET',
    headers: defaultHeader(),
  });
};

export const getMyGroupItems = (page) => {
  return fetch(MY_GROUP_ITEMS_URL(page), {
    method: 'GET',
    headers: defaultHeader(),
  });
};

export const getItems = (page) => {
  return fetch(ALL_ITEMS_URL(page), {
    method: 'GET',
    headers: defaultHeader(),
  });
};

export const getItemDetail = (id) => {
  return fetch(ITEM_URL(id), {
    method: 'GET',
    headers: defaultHeader(),
  });
};

export const createItem = (data) => {
  return fetch(CREATE_ITEM_URL, {
    method: 'POST',
    headers: defaultHeader(),
    body: JSON.stringify(data),
  });
};

export const placeGroupBuyItemRequest = (item) => {
  return fetch(CREATE_GROUP_BUY_ITEM_URL(item.id), {
    method: 'POST',
    headers: defaultHeader(),
    body: JSON.stringify({
      group_buying: {
        quantity: item.quantity,
      },
    }),
  });
};

export const getGroupBuyingItems = (page) => {
  return fetch(GROUP_BUYING_URL(page), {
    method: 'GET',
    headers: defaultHeader(),
  });
};

// export const deleteItem = id => {
//     return fetch(itemURL(id), {
//         method: "DELETE",
//         headers: defaultHeader(),
//     })
// };
