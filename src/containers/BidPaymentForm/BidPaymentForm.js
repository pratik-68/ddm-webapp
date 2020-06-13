import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Form, Modal, Alert } from 'react-bootstrap';
import {
  clearPayment,
  placeBidRequestSuccess,
} from '../../redux/actions/bidActions';
import { STRIPE_SUCCESS_MESSAGE } from '../../constants/action-constants';
import Loading from '../../components/Loading';

const BidPaymentForm = ({ paymentCallback }) => {
  const [paymentModal, setPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState();
  const [clientSecretKey, setClientSecretKey] = useState('');
  const successfulMessage = 'Bid Successfully Placed';

  const { payment, user } = useSelector(
    (state) => ({
      payment: state.bidReducer.payment,
      user: state.userReducer.user,
    }),
    shallowEqual
  );

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const dispatchAction = useDispatch();
  useEffect(() => {
    if (payment.token) {
      setPaymentModal(true);
      setLoading(false);
      setClientSecretKey(payment.token);
    } else {
      setLoading(true);
    }
  }, [payment]);

  const handlePaymentModal = () => {
    if (success) setSuccess(false);
    dispatchAction(clearPayment());
    paymentCallback();
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(false);
    setSuccess(false);
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecretKey, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.first_name + ' ' + user.last_name,
          email: user.email,
        },
      },
    });

    dispatchAction(placeBidRequestSuccess({ result, payment }));
    if (result.error) {
      setAlert(true);
      setMessage(result.error.message);
    } else {
      if (result.paymentIntent.status === STRIPE_SUCCESS_MESSAGE) {
        setSuccess(true);
        setMessage(successfulMessage);
      }
    }
  };

  if (success && paymentModal) {
    setPaymentModal(false);
  }

  return (
    <div className="container">
      {success && (
        <Alert
          variant="success"
          className="fixed-top"
          onClose={() => handlePaymentModal()}
          dismissible
        >
          {message}
        </Alert>
      )}
      <Modal show={loading} backdrop={'static'}>
        <Modal.Body>
          <Loading />
        </Modal.Body>
      </Modal>
      <Modal
        show={paymentModal}
        onHide={handlePaymentModal}
        backdrop={'static'}
      >
        {alert && (
          <Alert
            variant="danger"
            className="fixed-top"
            onClose={() => setAlert(false)}
            dismissible
          >
            {message}
          </Alert>
        )}
        <Modal.Header closeButton>
          <Modal.Title>Place Bid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
            <button disabled={!stripe}>Confirm Bid</button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BidPaymentForm;
