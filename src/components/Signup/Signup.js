// IMPORTING REACT AND HOOKS COMPONENT
import React, { useEffect, useState } from 'react';
// CONNECTING COMPONENT TO REDUX STORE
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// IMPORTING SINGUP ACTION FROM ACTION FILE
import { addSignupUser } from '../../redux/actions/signupActions';

import { clearError, clearSuccess } from '../../redux/actions/userActions';
import { Button } from 'react-bootstrap';
import {
  BOTH,
  BUYER,
  MOBILE_NUMBER,
  SELLER,
} from '../../constants/common-constants';

const Signup = ({ email, slug }) => {
  const dispatchAction = useDispatch();

  const { error, success } = useSelector(
    (state) => ({
      error: state.userReducer.error,
      success: state.userReducer.success,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatchAction(clearSuccess());
    dispatchAction(clearError());
  }, [dispatchAction]);

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
    mobile_number: '',
    type_of_user: '',
    address: '',
  });

  const errorBaseState = {
    first_name: false,
    last_name: false,
    password: false,
    password_confirmation: false,
    password_match: false,
    type_of_user: false,
    mobile_number: false,
    address: false,
  };

  const [errorMsg, setErrorMsg] = useState(errorBaseState);

  const errorMessage = {
    password_match: 'Password Doesnot Match',
    type_of_user: 'Invalid User Type',
    mobile_number: 'Invalid Mobile Number',
  };

  const emptyMessage = 'Required';

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrorMsg({
      ...errorMsg,
      [e.target.name]: false,
    });
    if (e.target.name === 'password_confirmation') {
      setErrorMsg({
        ...errorMsg,
        password_match: false,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg({ errorBaseState });
    if (success) dispatchAction(clearSuccess());
    if (error) dispatchAction(clearError());
    let emptyField = false;
    for (let i in user) {
      if (user[i] === '') {
        setErrorMsg((prevState) => ({
          ...prevState,
          [i]: true,
        }));
        emptyField = true;
      }
    }
    if (user.password !== user.password_confirmation) {
      emptyField = true;
      setErrorMsg((prevState) => ({ ...prevState, password_match: true }));
    } else if (!MOBILE_NUMBER.test(user.mobile_number)) {
      emptyField = true;
      setErrorMsg((prevState) => ({ ...prevState, mobile_number: true }));
    } else if (
      user.type_of_user !== SELLER &&
      user.type_of_user !== BUYER &&
      user.type_of_user !== BOTH
    ) {
      emptyField = true;
      setErrorMsg((prevState) => ({ ...prevState, type_of_user: true }));
    }
    if (!emptyField) {
      dispatchAction(addSignupUser(user, slug));
    }
  };

  if (success)
    return (
      <div className="container text-center text-secondary m-3 p-4">
        <h2>User Successfully Created.</h2>
        <p>Please Login to access your account.</p>
      </div>
    );
  else
    return (
      <div className="container">
        <h2 className="m-3 text-center text-primary">
          <b>
            <u>Fill Details to complete the Signup:</u>
          </b>
        </h2>
        <div className="d-flex justify-content mb-3">
          <form onSubmit={handleSubmit} className="col-sm-12 signup">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>Email:</b>
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readonly
                  className="form-control form-control"
                  value={email}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>
                  First Name:
                  <span className="text-danger">*</span>
                </b>
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="first_name"
                  className="form-control form-control"
                  value={user.first_name}
                  onChange={handleChange}
                />
                <small className="text-muted d-flex justify-content-end">
                  <p className="text-danger">
                    {errorMsg.first_name ? emptyMessage : null}
                    {error.first_name}
                  </p>
                </small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>
                  Last Name:
                  <span className="text-danger">*</span>
                </b>
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="last_name"
                  className="form-control form-control"
                  value={user.last_name}
                  onChange={handleChange}
                />
                <small className="text-muted d-flex justify-content-end">
                  <p className="text-danger">
                    {errorMsg.last_name ? emptyMessage : null}
                    {error.last_name}
                  </p>
                </small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>
                  Password:
                  <span className="text-danger">*</span>
                </b>
              </label>
              <div className="col-sm-9">
                <input
                  type="password"
                  name="password"
                  className="form-control form-control"
                  value={user.password}
                  onChange={handleChange}
                  minLength="8"
                  maxLength="20"
                />
                <small className="text-muted d-flex justify-content-between">
                  <p>Must be 8-20 characters long.</p>
                  <p className="text-danger">
                    {errorMsg.password ? emptyMessage : null}
                    {error.password}
                  </p>
                </small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>
                  Confirm Password:
                  <span className="text-danger">*</span>
                </b>
              </label>
              <div className="col-sm-9">
                <input
                  type="password"
                  name="password_confirmation"
                  className="form-control form-control"
                  value={user.password_confirmation}
                  onChange={handleChange}
                  minLength="8"
                  maxLength="20"
                />
                <small className="text-muted d-flex justify-content-between">
                  <p>Must be 8-20 characters long.</p>
                  <p className="text-danger">
                    {errorMsg.password_confirmation ? (
                      emptyMessage
                    ) : errorMsg.password_match ? (
                      <small className="mr-2 text-danger error">
                        {errorMessage.password_match}
                      </small>
                    ) : null}
                    {error.password_confirmation}
                  </p>
                </small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>
                  Mobile Number:
                  <span className="text-danger">*</span>
                </b>
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="mobile_number"
                  className="form-control form-control"
                  value={user.mobile_number}
                  onChange={handleChange}
                  minLength="8"
                  maxLength="20"
                />
                <small className="text-muted d-flex justify-content-end">
                  <p className="text-danger">
                    {errorMsg.mobile_number
                      ? user.mobile_number.length
                        ? errorMessage.mobile_number
                        : emptyMessage
                      : null}
                    {error.mobile_number}
                  </p>
                </small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>
                  Type of User:
                  <span className="text-danger">*</span>
                </b>
              </label>
              <div className="col-sm-9">
                <select
                  type="text"
                  name="type_of_user"
                  className="form-control form-control"
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="seller">Seller</option>
                  <option value="buyer">Buyer</option>
                  <option value="both">Both</option>
                </select>
                <small className="text-muted d-flex justify-content-end">
                  <p className="text-danger">
                    {errorMsg.type_of_user
                      ? user.type_of_user.length
                        ? errorMessage.type_of_user
                        : emptyMessage
                      : null}
                    {error.type_of_user}
                  </p>
                </small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>
                  Address:
                  <span className="text-danger">*</span>
                </b>
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="address"
                  className="form-control form-control"
                  value={user.address}
                  onChange={handleChange}
                />
                <small className="text-muted d-flex justify-content-end">
                  <p className="text-danger">
                    {errorMsg.address ? emptyMessage : null}
                    {error.address}
                  </p>
                </small>
              </div>
            </div>
            <div className="form-group row">
              <small className="error text-danger">{error.message}</small>
            </div>
            <Button className="m-4 col-6" block variant="success" type="submit">
              Signup
            </Button>
          </form>
        </div>
      </div>
    );
};

export default Signup;
