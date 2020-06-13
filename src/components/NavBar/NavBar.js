import React, { Fragment } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {
  ALL_ITEMS_ROUTE,
  DASHBOARD_ROUTE,
  INVITE_ROUTE,
  LOGIN_ROUTE,
  MY_ITEMS_ROUTE,
  PROFILE_ROUTE,
  REQUEST_ITEM_ROUTE,
  SIGN_UP_ROUTE,
  GROUP_BUYING_ITEMS_ROUTE,
  MY_TRANSACTIONS_ROUTE,
} from '../../constants/route-constants';
import { isBuyer, isSeller } from '../../utils';
import { Redirect } from 'react-router-dom';

const NavBar = ({ userData, authorizedUser, logoutCallback, redirect }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container">
        <Navbar.Brand href={DASHBOARD_ROUTE}>DDM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {authorizedUser ? (
            <Nav className="ml-auto">
              <Nav.Link href={DASHBOARD_ROUTE}>Home</Nav.Link>
              {isBuyer(userData.type_of_user) ? (
                <Fragment>
                  <Nav.Link href={REQUEST_ITEM_ROUTE}>Request Item</Nav.Link>
                  <Nav.Link href={GROUP_BUYING_ITEMS_ROUTE}>
                    Group Buying Items
                  </Nav.Link>
                </Fragment>
              ) : null}
              {isSeller(userData.type_of_user) ? (
                <Nav.Link href={ALL_ITEMS_ROUTE}>
                  Active Requested Items
                </Nav.Link>
              ) : null}
              {userData.first_name ? (
                <NavDropdown
                  title={userData.first_name}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href={PROFILE_ROUTE}>
                    Profile
                  </NavDropdown.Item>
                  {isBuyer(userData.type_of_user) ? (
                    <NavDropdown.Item href={MY_ITEMS_ROUTE}>
                      My Items
                    </NavDropdown.Item>
                  ) : null}
                  <NavDropdown.Item href={MY_TRANSACTIONS_ROUTE}>
                    My Transactions
                  </NavDropdown.Item>
                  <NavDropdown.Item href={INVITE_ROUTE}>
                    Invite
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutCallback}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : null}
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link href={SIGN_UP_ROUTE}>Signup</Nav.Link>
              <Nav.Link href={LOGIN_ROUTE}>Login</Nav.Link>
              {redirect ? <Redirect to={LOGIN_ROUTE} /> : null}
            </Nav>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
