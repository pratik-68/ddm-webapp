import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/NavBar';
import { userDetail } from '../../redux/actions/userActions';
import { logoutUser } from '../../redux/actions/loginActions';

const NavBar = () => {
  const dispatchAction = useDispatch();
  const { user, authorizedUser } = useSelector(
    (state) => ({
      user: state.userReducer.user,
      authorizedUser: state.userReducer.authorizedUser,
    }),
    shallowEqual
  );
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (authorizedUser && !user.first_name) {
      dispatchAction(userDetail());
    }
    if (authorizedUser) {
      setRedirect(true);
    }
  }, [authorizedUser, dispatchAction, user]);

  const handleLogout = () => {
    dispatchAction(logoutUser());
  };

  return (
    <Navbar
      userData={user}
      authorizedUser={authorizedUser}
      logoutCallback={handleLogout}
      redirect={redirect}
    />
  );
};

export default NavBar;
