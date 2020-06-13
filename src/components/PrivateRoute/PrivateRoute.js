import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../constants/route-constants';
import { useSelector, shallowEqual } from 'react-redux';

const PrivateRoute = ({ Component, ...rest }) => {
  const { authorizedUser } = useSelector(
    (state) => ({
      authorizedUser: state.userReducer.authorizedUser,
    }),
    shallowEqual
  );

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      {...rest}
      render={(props) =>
        authorizedUser ? (
          <Component {...props} />
        ) : authorizedUser === false ? (
          <Redirect to={LOGIN_ROUTE} />
        ) : null
      }
    />
  );
};

export default PrivateRoute;
