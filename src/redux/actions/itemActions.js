import {
  createItem,
  getGroupBuyingItems,
  getItemDetail,
  getItems,
  getMyGroupItems,
  getMyItems,
  placeGroupBuyItemRequest,
} from '../../services/itemService';
import {
  ERROR,
  GROUP_BUYING_ITEMS_LIST,
  ITEM_DATA,
  ITEMS_LIST,
  MY_GROUP_BUYING_ITEMS,
  MY_ITEMS,
  NOT_FOUND,
  UNAUTHORIZED_USER,
  SERVICE_UNAVAILABLE,
  SUCCESS,
} from '../../constants/action-constants';
import { logout } from '../../utils';

export const myItems = (page) => (dispatch) => {
  getMyItems(page)
    .then((res) => {
      if (res.status === 200) {
        res
          .json()
          .then((data) => {
            dispatch({
              type: MY_ITEMS,
              data: data,
            });
          })
          .catch((error) => {
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
          .catch((error) => {
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

export const myGroupItems = (page) => (dispatch) => {
  getMyGroupItems(page)
    .then((res) => {
      if (res.status === 200) {
        res
          .json()
          .then((data) => {
            dispatch({
              type: MY_GROUP_BUYING_ITEMS,
              data: data,
            });
          })
          .catch((error) => {
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
          .catch((error) => {
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

export const items = (page) => (dispatch) => {
  getItems(page)
    .then((res) => {
      if (res.status === 200) {
        res
          .json()
          .then((data) => {
            dispatch({
              type: ITEMS_LIST,
              data: data,
            });
          })
          .catch((err) => {
            return err;
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
          .catch((error) => {
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

export const itemDetail = (id) => (dispatch) => {
  getItemDetail(id)
    .then((res) => {
      if (res.status === 200) {
        res
          .json()
          .then((data) => {
            dispatch({
              type: ITEM_DATA,
              data: data,
            });
          })
          .catch((error) => {
            dispatch({
              type: SERVICE_UNAVAILABLE,
            });
          });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
        });
      } else if (res.status === 404) {
        res
          .json()
          .then((data) => {
            dispatch({
              type: NOT_FOUND,
            });
          })
          .catch((error) => {
            dispatch({
              type: SERVICE_UNAVAILABLE,
            });
          });
      } else {
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

export const postItem = (itemData) => (dispatch) => {
  const group_buy = itemData.groupBuy ? 1 : 0;
  const item = {
    name: itemData.detail.name,
    description: itemData.detail.description,
    max_amount: itemData.detail.max_amount,
    status: itemData.detail.status,
    bidding_end_time: itemData.detail.bidding_end_time,
    quantity: itemData.detail.quantity,
    group_buying: group_buy,
  };
  const descriptions = itemData.descriptions.values;
  createItem({ item, descriptions })
    .then((res) => {
      if (res.status === 201) {
        return res.json().then((data) => {
          dispatch({
            type: ITEM_DATA,
            data: data,
          });
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
        });
      } else if (res.status === 400) {
        return res.json().then((data) => {
          dispatch({
            type: ERROR,
            error: data.error,
          });
        });
      } else {
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

export const placeGroupBuyRequest = (itemData) => (dispatch) => {
  const item = {
    id: itemData.item_id,
    quantity: itemData.detail.quantity,
  };
  placeGroupBuyItemRequest(item)
    .then((res) => {
      if (res.status === 201) {
        return res.json().then((data) => {
          dispatch({
            type: SUCCESS,
          });
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
        });
      } else if (res.status === 400) {
        return res.json().then((data) => {
          dispatch({
            type: ERROR,
            error: data.error,
          });
        });
      } else {
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

export const groupBuyingItems = (page) => (dispatch) => {
  getGroupBuyingItems(page)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          dispatch({
            type: GROUP_BUYING_ITEMS_LIST,
            data: data,
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
