import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearSuccess, clearError } from '../../redux/actions/userActions';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import BidPaymentForm from '../BidPaymentForm/BidPaymentForm';
import { STRIPE_PUBLIC_KEY } from '../../constants/action-constants';

const BidPayment = ({ paymentCallback }) => {
  const dispatchAction = useDispatch();

  useEffect(() => {
    dispatchAction(clearSuccess());
    dispatchAction(clearError());
  }, [dispatchAction]);

  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

  return (
    <div className="container">
      <Elements stripe={stripePromise}>
        <BidPaymentForm paymentCallback={paymentCallback} />
      </Elements>
    </div>
  );
};

export default BidPayment;
