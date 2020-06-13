import {
  GROUP_BUYING_ITEMS_LIST,
  ITEM_DATA,
  ITEMS_LIST,
  MY_GROUP_BUYING_ITEMS,
  MY_ITEMS,
} from '../../constants/action-constants';

const initialState = {
  itemList: {
    items: [],
    list_size: 0,
  },
  groupBuyingitemsList: {
    items: [],
    list_size: 0,
  },
  item: {},
  myItemList: {
    items: [],
    list_size: 0,
  },
  myGroupItemList: {
    items: [],
    list_size: 0,
  },
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_ITEMS:
      return {
        ...state,
        myItemList: {
          items: action.data.items,
          list_size: action.data.meta.total_count,
        },
      };
    case MY_GROUP_BUYING_ITEMS:
      return {
        ...state,
        myGroupItemList: {
          items: action.data.items,
          list_size: action.data.meta.total_count,
        },
      };
    case ITEMS_LIST:
      return {
        ...state,
        itemList: {
          items: action.data.items,
          list_size: action.data.meta.total_count,
        },
      };
    case GROUP_BUYING_ITEMS_LIST:
      return {
        ...state,
        groupBuyingitemsList: {
          items: action.data.items,
          list_size: action.data.meta.total_count,
        },
      };
    case ITEM_DATA:
      return { ...state, item: action.data.item };
    default:
      return state;
  }
};

export default itemReducer;
