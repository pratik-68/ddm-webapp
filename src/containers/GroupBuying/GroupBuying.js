import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Modal, Alert, Form } from 'react-bootstrap';
import { clearError, clearSuccess } from '../../redux/actions/userActions';
import TextInput from '../../components/TextInput';
import { NUMBERS_ONLY } from '../../constants/common-constants';
import { Button } from 'react-bootstrap';
import {
  placeGroupBuyRequest,
  itemDetail,
} from '../../redux/actions/itemActions';

const GroupBuying = ({ item_id }) => {
  const dispatchAction = useDispatch();
  const { error, success } = useSelector(
    (state) => ({
      error: state.userReducer.error,
      success: state.userReducer.success,
    }),
    shallowEqual
  );
  const [buyModal, setBuyModal] = useState(false);

  const handleBuyModal = () => {
    setBuyModal(!buyModal);
  };

  useEffect(() => {
    dispatchAction(clearError());
    dispatchAction(clearSuccess());
  }, [dispatchAction]);

  const [detail, setDetail] = useState({
    quantity: '',
  });
  const [valid, setValid] = useState({
    quantity: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    quantity: '',
  });
  const emptyMsg = 'Required';
  const invalidMsg = 'Invalid';
  const requiredMessage = 'Please Fill All Requirement Before Submitting';
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [requiredAlert, setRequiredAlert] = useState(false);

  const callBackDetail = (data) => {
    setDetail((prevState) => ({
      ...prevState,
      [data.name]: data.data,
    }));
    setValid((prevState) => ({
      ...prevState,
      [data.name]: data.valid,
    }));
    setErrorMsg((prevState) => ({
      ...prevState,
      [data.name]: data.errorMsg,
    }));
  };

  const handleBuySubmit = (e) => {
    e.preventDefault();
    setAlert(false);
    setErrorAlert(false);
    setRequiredAlert(false);
    if (!detail.quantity.length) {
      setErrorMsg({
        ...errorMsg,
        quantity: emptyMsg,
      });
      setRequiredAlert(true);
    } else if (!valid.quantity) {
      setAlert(true);
    } else {
      dispatchAction(placeGroupBuyRequest({ item_id, detail }));
    }
  };

  const quantityModal = (
    <Modal show={buyModal} onHide={handleBuyModal}>
      {alert ? (
        <Alert
          variant="danger"
          className="fixed-top"
          onClose={() => setAlert(false)}
          dismissible
        >
          {invalidMsg}
        </Alert>
      ) : null}
      {errorAlert ? (
        <Alert
          variant="danger"
          className="fixed-top"
          onClose={() => dispatchAction(clearError())}
          dismissible
        >
          {error.message}
        </Alert>
      ) : null}
      {requiredAlert ? (
        <Alert
          variant="danger"
          className="fixed-top"
          onClose={() => setRequiredAlert(false)}
          dismissible
        >
          {requiredMessage}
        </Alert>
      ) : null}
      <Modal.Header closeButton>
        <Modal.Title>Buy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="pt-3 pb-4" onSubmit={handleBuySubmit}>
          <div className="px-3">
            <TextInput
              controlName={`quantity`}
              required={true}
              label={`Quantity`}
              maxLength={10}
              parentCallback={callBackDetail}
              REGX={NUMBERS_ONLY}
              errorMsg={errorMsg.quantity}
              defaultErrorMsg={'Only Numbers allowed'}
              defaultValue={detail.quantity}
              minValue="1"
            />
          </div>
          <Button block type="submit">
            Place Request
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );

  if (success) {
    dispatchAction(itemDetail(item_id));
    dispatchAction(clearSuccess());
  }

  return (
    <div className="container pl-5 my-5">
      <button onClick={handleBuyModal} className="btn btn-primary">
        Place Buy Request
      </button>
      {quantityModal}
    </div>
  );
};

export default GroupBuying;
