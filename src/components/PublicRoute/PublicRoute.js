import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { DASHBOARD_ROUTE } from '../../constants/route-constants';
import { shallowEqual, useSelector } from 'react-redux';

const PublicRoute = ({ Component, restricted, ...rest }) => {
  const { authorizedUser } = useSelector(
    (state) => ({
      authorizedUser: state.userReducer.authorizedUser,
    }),
    shallowEqual
  );

  return (
    <Route
      {...rest}
      render={(props) =>
        authorizedUser !== null ? (
          authorizedUser && restricted ? (
            <Redirect to={DASHBOARD_ROUTE} />
          ) : (
            <Component {...props} />
          )
        ) : null
      }
    />
  );
};

export default PublicRoute;
