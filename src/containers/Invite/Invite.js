// IMPORTING REACT AND HOOKS COMPONENTS
import React, { useEffect, useState } from 'react';
// CONNECTING COMPONENT TO REDUX STORE
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// IMPORTING INVITE AND CLEAR ACTIONS FROM ACTION FILE
import {
  clearError,
  clearSuccess,
  inviteUser,
} from '../../redux/actions/userActions';

import { Button } from 'react-bootstrap';

// INVITE FUNCTION FOR INVITING USER
const Invite = () => {
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

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const emptyMessage = 'Required';

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) dispatchAction(clearError());
    if (success) dispatchAction(clearSuccess());
    setEmailError(false);
    if (email === '') setEmailError(true);
    else dispatchAction(inviteUser(email));
  };

  let redirect = null;
  if (success) {
    redirect = (
      <div className="mt-3 mb-3 d-flex justify-content-center">
        User Successfully Invited
      </div>
    );
  } else if (error) {
    redirect = (
      <span className="d-flex justify-content-center mt-3 mb-3 text-danger">
        {error.email}
        {error.message}
      </span>
    );
  }
  if (emailError) {
    redirect = (
      <span className="d-flex justify-content-center mt-3 mb-3 text-danger">
        {emptyMessage}
      </span>
    );
  }
  return (
    <div className="container d-flex justify-content-center">
      <div className="bg-light p-4 m-5 col-4 rounded-lg shadow">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-center text-primary font-weight-bold">
            <u>Invite Friend:</u>
          </h2>
          <div className="">
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
            {redirect}
            <Button variant="success" block className="mt-3" type="submit">
              Invite
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Invite;
