import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import {
  clearUserMessage,
  updateUserDetail,
  userDetail,
} from '../../redux/actions/userActions';

import { to_Date } from '../../utils';

const UserProfile = () => {
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(userDetail());
  }, [dispatchAction]);

  const { error, userData, successMessage } = useSelector(
    (state) => ({
      error: state.userReducer.userError,
      userData: state.userReducer.user,
      successMessage: state.userReducer.successMessage,
    }),
    shallowEqual
  );

  const [state, setState] = useState({
    edit: false,
    first_name: '',
    last_name: '',
    old_password: '',
    password: '',
    password_confirmation: '',
    mobile_number: '',
    type_of_user: '',
    address: '',
    same_new_password_error: false,
    same_new_password_error_message: 'New Password Must be Different',
    password_match_error: false,
    password_match_error_message: 'Password Does not Match',
  });

  const baseState = {
    ...state,
    edit: false,
    old_password: '',
    password: '',
    password_confirmation: '',
  };

  const editProfile = () => {
    setState({
      ...state,
      first_name: userData.first_name,
      last_name: userData.last_name,
      mobile_number: userData.mobile_number,
      type_of_user: userData.type_of_user,
      address: userData.address,
      edit: !state.edit,
    });
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({
      ...state,
      password_match_error: false,
      same_new_password_error: false,
    });
    if (state.password === state.old_password && state.password.length)
      setState((prevState) => ({
        ...prevState,
        same_new_password_error: true,
      }));
    else if (state.password !== state.password_confirmation)
      setState((prevState) => ({
        ...prevState,
        password_match_error: true,
      }));
    else {
      dispatchAction(updateUserDetail(state));
    }
  };

  if (successMessage) {
    setState({ ...baseState });
    dispatchAction(clearUserMessage());
  }

  if (!state.edit) {
    return (
      <div className="container">
        <div className="card my-5 border-primary">
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                <u>User Details:</u>
              </h3>
              <p className="card-text">
                Name: {userData.first_name} {userData.last_name}
              </p>
              <p className="card-text">Email: {userData.email}</p>
              <p className="card-text">
                Mobile Number: {userData.mobile_number}
              </p>
              <p className="card-text">User Type: {userData.type_of_user}</p>
              <p className="card-text">Address: {userData.address}</p>
              <p className="card-text">
                Invite Count: {userData.invite_count}{' '}
                {userData.last_invite_at ? (
                  <span>({to_Date(userData.last_invite_at)})</span>
                ) : null}
              </p>
              <button
                className="btn btn-outline-success m-3 col-5"
                onClick={editProfile}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  console.log(state);
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="col-6 m-5">
        <h3 className="pb-3 text-primary">
          <u>Edit Details:</u>
        </h3>
        <div className="mb-3">
          <label>
            First Name<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            value={state.first_name}
            name="first_name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>
            Last Name<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            value={state.last_name}
            name="last_name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            value={userData.email}
            name="email"
            disabled
          />
        </div>
        <div className="mb-3">
          <label>Type of user</label>
          <select
            disabled
            name="type_of_user"
            className="custom-select"
            value={state.type_of_user}
            onChange={handleChange}
          >
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div className="mb-3">
          <label> Address</label>
          <span className="text-danger">*</span>
          <input
            type="text"
            className="form-control"
            value={state.address}
            name="address"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Mobile Number</label>
          <input
            type="text"
            className="form-control"
            value={state.mobile_number}
            name="mobile_number"
            pattern="[6-9]{1}[0-9]{9}"
            onChange={handleChange}
            title="Please enter valid 10 digit mobile number"
            required
          />
          <small className="d-flex justify-content-end text-danger">
            {error.mobile_number}
          </small>
        </div>
        <div className="mb-3">
          <label>
            Old Password (<small className="text-danger">*</small>
            <small>for password change </small>)
          </label>
          <input
            type="password"
            name="old_password"
            className="form-control"
            minLength="8"
            maxLength="20"
            value={state.old_password}
            onChange={handleChange}
            required={state.password.length}
          />
          <small className="text-muted d-flex justify-content-between">
            <p className="text-danger">{error.old_password}</p>
          </small>
        </div>
        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            minLength="8"
            maxLength="20"
            value={state.password}
            onChange={handleChange}
          />
          <small className="text-muted d-flex justify-content-between">
            <p className="text-danger">
              {state.same_new_password_error
                ? state.same_new_password_error_message
                : null}
              {error.same_new_password}
            </p>
          </small>
        </div>
        <div className="mb-3">
          <label>Password Confirmation</label>
          <input
            type="password"
            name="password_confirmation"
            className="form-control"
            minLength="8"
            maxLength="20"
            value={state.password_confirmation}
            onChange={handleChange}
            required={state.password.length}
          />
          <small className="text-muted d-flex justify-content-between">
            <p className="text-danger">
              {state.password_match_error
                ? state.password_match_error_message
                : null}
              {error.password_confirmation}
            </p>
          </small>
        </div>
        <button className="btn btn-outline-success btn-block mb-3">
          Update
        </button>
        <button
          className="btn btn-outline-danger btn-block"
          onClick={editProfile}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
