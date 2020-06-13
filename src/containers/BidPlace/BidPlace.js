import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { to_DateTime } from '../../utils';
import { Modal, Form, Button } from 'react-bootstrap';
import { NUMBERS_ONLY } from '../../constants/common-constants';
import {
  placeBidRequest,
  getTopBids,
  getBidsList,
} from '../../redux/actions/bidActions';
import { Alert } from 'react-bootstrap';
import TextInput from '../../components/TextInput';
import BidPayment from '../BidPayment';
import ImageUploader from 'react-images-upload';
import { LABEL, DETAIL } from '../../constants/common-constants';
import './BidPlace.css';
import { clearError } from '../../redux/actions/userActions';

const BidPlace = ({ item_id = null }) => {
  const dispatchAction = useDispatch();
  const [placeBidModal, setPlaceBidModal] = useState(false);
  const [placeBidActive, setPlaceBidActive] = useState(false);
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [requiredAlert, setRequiredAlert] = useState(false);
  const [bidPayment, setBidPayment] = useState(false);

  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState({
    values: [],
    valid: [],
    errorMsg: [],
  });
  const [amount, setAmount] = useState('');

  const [errorMsg, setErrorMsg] = useState({
    amount: '',
    title: '',
  });

  const [valid, setValid] = useState({
    amount: false,
    title: false,
  });

  const emptyMsg = 'Required';
  const invalidMsg = 'Invalid';
  const requirementMessage = 'Please Fill All Requirement Before Submitting';

  const { topBids, item, payment, error } = useSelector(
    (state) => ({
      topBids: state.bidReducer.topBids,
      item: state.itemReducer.item,
      payment: state.bidReducer.payment,
      error: state.userReducer.error,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatchAction(clearError());
  }, [dispatchAction]);

  useEffect(() => {
    if (error && error.message) setErrorAlert(true);
    else setErrorAlert(false);
  }, [error]);

  useEffect(() => {
    if (new Date(item.bidding_start_time) < new Date()) {
      setPlaceBidActive(true);
    }
  }, [item]);

  const handlePlaceBidModal = () => {
    if (!placeBidModal) dispatchAction(getTopBids(item_id));
    setPlaceBidModal(!placeBidModal);
  };

  const handleImage = (image) => {
    setImages(image);
  };

  const handleAddDescriptions = () => {
    let values = descriptions.values;
    let valid = descriptions.valid;
    let errorMsg = descriptions.errorMsg;
    let size = descriptions.values.length;
    if (
      !size ||
      (values[size - 1].label.length && values[size - 1].detail.length)
    ) {
      values.push({ label: '', detail: '' });
      valid.push({ label: true, detail: true });
      errorMsg.push({ label: '', detail: '' });
      setDescriptions({
        values: values,
        valid: valid,
        errorMsg: errorMsg,
      });
    }
  };

  const handleRemoveDescriptions = (index) => {
    let values = descriptions.values;
    let valid = descriptions.valid;
    let errorMsg = descriptions.errorMsg;
    values.splice(index, 1);
    valid.splice(index, 1);
    errorMsg.splice(index, 1);
    setDescriptions({
      values: values,
      valid: valid,
      errorMsg: errorMsg,
    });
  };

  const callBackDescriptions = (value, index) => {
    const values = descriptions.values;
    const valid = descriptions.valid;
    const errorMsg = descriptions.errorMsg;
    if (value.name === LABEL) {
      values[index].label = value.data;
      valid[index].label = value.valid;
      errorMsg[index].label = value.errorMsg;
    } else if (value.name === DETAIL) {
      values[index].detail = value.data;
      valid[index].detail = value.valid;
      errorMsg[index].detail = value.errorMsg;
    }
    setDescriptions({
      values: values,
      valid: valid,
      errorMsg: errorMsg,
    });
  };

  const callBackAmount = (data) => {
    setAmount(data.data);
    setValid({
      ...valid,
      [data.name]: data.valid,
    });
    setErrorMsg({
      ...errorMsg,
      [data.name]: data.errorMsg,
    });
  };

  const callBackTitle = (data) => {
    setTitle(data.data);
    setValid({
      ...valid,
      [data.name]: data.valid,
    });
    setErrorMsg({
      ...errorMsg,
      [data.name]: data.errorMsg,
    });
  };

  const handleBidPayment = () => {
    if (bidPayment) dispatchAction(getBidsList(item_id));
    setBidPayment(!bidPayment);
  };

  const handlePlaceBidSubmit = (e) => {
    e.preventDefault();
    setAlert(false);
    setErrorAlert(false);
    setRequiredAlert(false);
    if (!title.length) {
      setErrorMsg((prevState) => ({
        ...prevState,
        title: emptyMsg,
      }));
      setRequiredAlert(true);
      return;
    }
    if (images.length < 6) {
      setRequiredAlert(true);
      return;
    }
    if (!amount.length) {
      setErrorMsg((prevState) => ({
        ...prevState,
        amount: emptyMsg,
      }));
      setRequiredAlert(true);
      return;
    }
    if (!valid.amount || !valid.title) {
      setAlert(true);
      return;
    }

    let flag = true;
    const values = descriptions.values;
    let valids = descriptions.valid;
    let errorMsg = descriptions.errorMsg;
    for (let index in values) {
      if (!values[index].label && values[index].detail) {
        valids[index].label = false;
        errorMsg[index].label = emptyMsg;
      } else if (values[index].label && !values[index].detail) {
        valids[index].detail = false;
        errorMsg[index].detail = emptyMsg;
      } else if (!values[index].label && !values[index].detail) {
        valids[index].label = true;
        valids[index].detail = true;
        errorMsg[index].label = '';
        errorMsg[index].detail = '';
      }
      if (!valids[index].label || !valids[index].detail) {
        flag = false;
        setAlert(true);
      }
    }
    setDescriptions({
      values: values,
      valid: valids,
      errorMsg: errorMsg,
    });
    if (flag) {
      dispatchAction(
        placeBidRequest({
          item_id,
          title,
          amount,
          images,
          descriptions,
        })
      );
    }
  };

  const placeBidForm = (
    <Form className="pt-3 pb-4" onSubmit={handlePlaceBidSubmit}>
      <div className="px-3">
        <TextInput
          controlName={`title`}
          required={true}
          label={`Title`}
          maxLength={10}
          parentCallback={callBackTitle}
          errorMsg={errorMsg.title}
          defaultErrorMsg={'Invalid Name'}
          defaultValue={title}
        />
        Images:<span className="text-danger">* </span> (minimum 6)
        <div>
          <ImageUploader
            withIcon={true}
            buttonText="Choose images"
            withPreview={true}
            onChange={handleImage}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
          />
        </div>
        <div className="pb-3">
          Descriptions (optional):
          <button
            type="button"
            className="btn btn-link pt-1"
            onClick={handleAddDescriptions}
          >
            +
          </button>
        </div>
        {descriptions.values.length ? (
          <div className="form-row">
            {descriptions.values.map((inputField, index) => (
              <Fragment key={`${inputField}~${index}`}>
                <div className={`col-5`}>
                  <TextInput
                    controlName={`label`}
                    label={`Label`}
                    maxLength={20}
                    parentCallback={(value) =>
                      callBackDescriptions(value, index)
                    }
                    errorMsg={descriptions.errorMsg[index].label}
                    defaultValue={inputField.label}
                  />
                </div>
                <div className={`col-6`}>
                  <TextInput
                    controlName={`detail`}
                    label={`Detail`}
                    maxLength={20}
                    parentCallback={(value) =>
                      callBackDescriptions(value, index)
                    }
                    errorMsg={descriptions.errorMsg[index].detail}
                    defaultValue={inputField.detail}
                  />
                </div>
                <b className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => handleRemoveDescriptions(index)}
                  >
                    -
                  </button>
                </b>
              </Fragment>
            ))}
          </div>
        ) : null}
        <TextInput
          controlName={`amount`}
          required={true}
          label={`Amount (Rupees)`}
          maxLength={10}
          parentCallback={callBackAmount}
          REGX={NUMBERS_ONLY}
          errorMsg={errorMsg.amount}
          defaultErrorMsg={'Only Numbers allowed'}
          defaultValue={amount}
          maxValue={parseFloat(item.max_amount) * parseInt(item.quantity)}
        />
      </div>
      <div className="d-flex justify-content-between px-3 pb-3">
        <b>Payable Amount : Max(1$, 1%)</b>
      </div>
      <Button block type="submit">
        Proceed Payment
      </Button>
    </Form>
  );

  const placeBidFormModal = (
    <Modal show={placeBidModal} onHide={handlePlaceBidModal}>
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
          {requirementMessage}
        </Alert>
      ) : null}
      <Modal.Header closeButton>
        <Modal.Title>Place Bid</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {placeBidForm}
        {topBids.length ? (
          <div>
            <h3>Top Bids: </h3>
            {topBids.map((data, index) => {
              return (
                <p className="text-capitalize" key={index}>
                  {index + 1}) Amount: {parseFloat(data.amount)}
                </p>
              );
            })}
          </div>
        ) : (
          <div className="container">No Bids Available for this Item.</div>
        )}
      </Modal.Body>
    </Modal>
  );

  if (payment.token && placeBidModal) {
    handleBidPayment();
    handlePlaceBidModal();
  }

  return (
    <Fragment>
      <div className="container pl-5 my-5">
        {new Date(item.bidding_end_time) > new Date() ? (
          <Fragment>
            <button
              disabled={!placeBidActive}
              onClick={handlePlaceBidModal}
              className="btn btn-primary"
            >
              Place Bid
            </button>
            {placeBidActive ? null : (
              <span className="pl-3">
                Bidding Start Time: {to_DateTime(item.bidding_start_time)}
              </span>
            )}
          </Fragment>
        ) : null}
      </div>
      {placeBidFormModal}
      {bidPayment ? <BidPayment paymentCallback={handleBidPayment} /> : null}
    </Fragment>
  );
};

export default BidPlace;
