import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import userReducer from './userReducer';
import itemReducer from './itemReducer';
import bidReducer from './bidReducer';
import transactionReducer from './transactionReducer';
import { USER_LOGOUT } from '../../constants/action-constants';

const appReducer = combineReducers({
  bidReducer,
  itemReducer,
  signupReducer,
  transactionReducer,
  userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    // clear state
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
