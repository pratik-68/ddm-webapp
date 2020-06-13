import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { addSignupEmail } from '../../redux/actions/signupActions';

import { clearError, clearSuccess } from '../../redux/actions/userActions';
import { Button } from 'react-bootstrap';
import {
  LANDING_PAGE_ROUTE,
  LOGIN_ROUTE,
} from '../../constants/route-constants';

const SignupEmail = () => {
  const dispatchAction = useDispatch();

  const { error, success } = useSelector(
    (state) => ({
      error: state.userReducer.error,
      success: state.userReducer.success,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatchAction(clearError());
    dispatchAction(clearSuccess());
  }, [dispatchAction]);

  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    e.persist();
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchAction(addSignupEmail(email));
  };

  let authRedirect = null;
  if (success) {
    return <Redirect to={LANDING_PAGE_ROUTE} />;
  }

  return (
    <div className="container d-flex justify-content-center">
      {authRedirect}
      <div className="bg-light p-4 m-5 col-4 rounded-lg shadow">
        <form onSubmit={handleSubmit}>
          <h2 className="pb-3 text-primary text-center">
            <u>Create your account</u>
          </h2>
          <div className="mb-3">
            <label>Email Address</label>
            <span className="text-danger">*</span>
            <input
              type="email"
              name="email"
              className="form-control"
              value={email}
              onChange={handleChange}
              required
            />
            <span className="d-flex mt-3 justify-content-center text-danger">
              {error.email}
            </span>
          </div>
          <Button variant="success" block className="mb-3" type="submit">
            Signup
          </Button>
          <Link
            className="btn btn-outline-primary btn-block mb-3"
            to={LOGIN_ROUTE}
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignupEmail;
