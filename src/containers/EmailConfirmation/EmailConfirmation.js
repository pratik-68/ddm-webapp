import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { addUserVerification } from '../../redux/actions/signupActions';
import Signup from '../../components/Signup';
import { clearError, clearSuccess } from '../../redux/actions/userActions';

const EmailConfirmation = (props) => {
  const dispatchAction = useDispatch();
  const slug = props.match.params.slug;

  const { error, user, success } = useSelector(
    (state) => ({
      error: state.userReducer.error,
      user: state.signupReducer.data,
      success: state.signupReducer.success,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatchAction(clearSuccess());
    dispatchAction(clearError());
    dispatchAction(addUserVerification(slug));
  }, [dispatchAction, slug]);

  let redirect = null;
  if (success)
    return (
      <div className="container">
        <Signup slug={slug} email={user.email} />
      </div>
    );
  else
    return (
      <div className="container">
        {redirect}
        <h2 className="text-center text-secondary m-3 p-4">
          <b>
            {error.token}
            {error.email}
            {error.message}
          </b>
        </h2>
      </div>
    );
};

export default EmailConfirmation;
