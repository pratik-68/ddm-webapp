import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import AllItems from './containers/AllItems';
import BidDetails from './containers/BidDetails';
import Dashboard from './containers/Dashboard';
import EmailConfirmation from './containers/EmailConfirmation';
import Error404 from './components/Error404';
import Footer from './components/Footer';
import GroupBuyingItems from './containers/GroupBuyingItems';
import Invite from './containers/Invite';
import ItemDetail from './containers/ItemDetail';
import LandingPage from './components/LandingPage';
import Login from './containers/Login';
import MyItems from './containers/MyItems';
import MyTransactions from './containers/MyTransactions';
import NavBar from './containers/NavBar';
import ServiceUnavailable from './components/ServiceUnavailable';
import SignupEmail from './containers/SignupEmail';
import TransactionDetail from './containers/TransactionDetail';
import RequestItem from './containers/RequestItem';
import UserProfile from './containers/UserProfile';

import { loadUser } from './redux/actions/userActions';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  ALL_ITEMS_ROUTE,
  BID_DETAIL_ROUTE,
  DASHBOARD_ROUTE,
  EMAIL_CONFIRMATION_ROUTE,
  GROUP_BUYING_ITEMS_ROUTE,
  INDEX_ROUTE,
  INVITE_ROUTE,
  ITEM_DETAIL_ROUTE,
  LANDING_PAGE_ROUTE,
  LOGIN_ROUTE,
  MY_ITEMS_ROUTE,
  MY_TRANSACTIONS_ROUTE,
  PROFILE_ROUTE,
  REQUEST_ITEM_ROUTE,
  SERVICE_UNAVAILABLE_ROUTE,
  SIGN_UP_ROUTE,
  TRANSACTION_DETAIL_ROUTE,
} from './constants/route-constants';

const App = () => {
  const dispatchAction = useDispatch();
  const { authorizedUser, serviceUnavailable } = useSelector(
    (state) => ({
      authorizedUser: state.userReducer.authorizedUser,
      serviceUnavailable: state.userReducer.serviceUnavailable,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (authorizedUser === null) dispatchAction(loadUser());
  }, [dispatchAction, authorizedUser]);

  return (
    <Router>
      <div className="main-body">
        {serviceUnavailable ? (
          <Redirect to={SERVICE_UNAVAILABLE_ROUTE} />
        ) : null}
        {authorizedUser !== null ? <NavBar /> : null}
        <Switch>
          <PublicRoute
            restricted={true}
            Component={Login}
            path={LOGIN_ROUTE}
            exact
          />
          <PublicRoute
            restricted={true}
            Component={SignupEmail}
            path={SIGN_UP_ROUTE}
            exact
          />
          <PublicRoute
            restricted={true}
            Component={EmailConfirmation}
            path={EMAIL_CONFIRMATION_ROUTE}
            exact
          />
          <PublicRoute
            restricted={true}
            Component={LandingPage}
            path={LANDING_PAGE_ROUTE}
            exact
          />
          <PrivateRoute Component={Dashboard} path={DASHBOARD_ROUTE} exact />
          <PrivateRoute Component={UserProfile} path={PROFILE_ROUTE} exact />
          <PrivateRoute Component={AllItems} path={ALL_ITEMS_ROUTE} exact />
          <PrivateRoute Component={MyItems} path={MY_ITEMS_ROUTE} exact />
          <PrivateRoute Component={ItemDetail} path={ITEM_DETAIL_ROUTE} exact />
          <PrivateRoute
            Component={RequestItem}
            path={REQUEST_ITEM_ROUTE}
            exact
          />
          <PrivateRoute
            Component={GroupBuyingItems}
            path={GROUP_BUYING_ITEMS_ROUTE}
            exact
          />
          <PrivateRoute Component={BidDetails} path={BID_DETAIL_ROUTE} exact />
          <PrivateRoute
            Component={MyTransactions}
            path={MY_TRANSACTIONS_ROUTE}
            exact
          />
          <PrivateRoute
            Component={TransactionDetail}
            path={TRANSACTION_DETAIL_ROUTE}
            exact
          />
          <PrivateRoute Component={Invite} path={INVITE_ROUTE} exact />
          <PublicRoute
            Component={ServiceUnavailable}
            path={SERVICE_UNAVAILABLE_ROUTE}
            exact
          />
          <PublicRoute Component={Error404} path={INDEX_ROUTE} />
        </Switch>
      </div>
      {authorizedUser !== null ? <Footer /> : null}
    </Router>
  );
};

export default App;
