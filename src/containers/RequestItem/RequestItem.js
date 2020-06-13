import React, { Fragment, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Alert, Button, Form } from 'react-bootstrap';

import DateTimePicker from 'react-datetime-picker';
import { postItem } from '../../redux/actions/itemActions';
import TextInput from '../../components/TextInput';
import {
  ALL_CHARACTER,
  NEW_ITEM,
  NUMBERS_ONLY,
  OLD_ITEM,
  SECOND_HAND,
  STRING_WITH_NUMBER_SYMBOL,
} from '../../constants/common-constants';
import { Redirect } from 'react-router-dom';
import { ITEM_DETAIL_URL } from '../../constants/route-constants';

const RequestItem = () => {
  const dispatchAction = useDispatch();
  const { item } = useSelector(
    (state) => ({
      item: state.itemReducer.item,
    }),
    shallowEqual
  );

  const [alert, setAlert] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [detail, setDetail] = useState({
    name: '',
    description: '',
    max_amount: '',
    status: '',
    bidding_end_time: new Date(),
    quantity: '',
  });

  const [groupBuy, setGroupBuy] = useState(false);
  const [valid, setValid] = useState({
    name: false,
    description: false,
    max_amount: false,
    status: false,
    bidding_end_time: false,
    quantity: false,
  });

  const [error, setError] = useState({
    name: '',
    description: '',
    max_amount: '',
    status: '',
    bidding_end_time: '',
    quantity: '',
  });

  const callBackDetail = (data) => {
    setDetail((prevState) => ({
      ...prevState,
      [data.name]: data.data,
    }));
    setValid((prevState) => ({
      ...prevState,
      [data.name]: data.valid,
    }));
    setError((prevState) => ({
      ...prevState,
      [data.name]: data.errorMsg,
    }));
  };

  const handleStatus = (e) => {
    if (e.target.value)
      callBackDetail({
        name: 'status',
        data: e.target.value,
        valid: true,
        errorMsg: '',
      });
    else {
      callBackDetail({
        name: 'status',
        data: e.target.value,
        valid: false,
        errorMsg: "This field can't be empty",
      });
    }
  };

  const handleDateChange = (value) => {
    if (value > new Date())
      callBackDetail({
        name: 'bidding_end_time',
        data: value,
        valid: true,
        errorMsg: '',
      });
    else {
      callBackDetail({
        name: 'bidding_end_time',
        data: value,
        valid: false,
        errorMsg: 'Time must be greater than current time',
      });
    }
  };

  const [descriptions, setDescriptions] = useState({
    values: [],
    valid: [],
    errorMsg: [],
  });

  const callBackDescriptions = (value, index) => {
    let values = descriptions.values;
    let valid = descriptions.valid;
    let errorMsg = descriptions.errorMsg;
    if (value.name === 'label') {
      values[index].label = value.data;
      valid[index].label = value.valid;
      errorMsg[index].label = value.errorMsg;
    } else {
      values[index].detail = value.data;
      valid[index].detail = value.valid;
      errorMsg[index].detail = value.errorMsg;
    }
    setDescriptions((prevState) => ({
      ...prevState,
      values: values,
      valid: valid,
      errorMsg: errorMsg,
    }));
  };

  const handleAddFields = () => {
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

  const handleRemoveFields = (index) => {
    let values = descriptions.values;
    let valid = descriptions.valid;
    let errorMsg = descriptions.errorMsg;
    values.splice(index, 1);
    valid.splice(index, 1);
    errorMsg.splice(index, 1);
    setDescriptions((prevState) => ({
      ...prevState,
      values: values,
      valid: valid,
      errorMsg: errorMsg,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;
    for (let i in valid) {
      if (!valid[i]) {
        setError((prevState) => ({
          ...prevState,
          [i]: 'Invalid Input',
        }));
        flag = false;
        setAlert(true);
      }
    }
    const values = descriptions.values;
    const valid_temp = descriptions.valid;
    const errorMsg = descriptions.errorMsg;
    for (let index in values) {
      if (
        !valid_temp[index].label ||
        (!values[index].label && values[index].detail)
      ) {
        flag = false;
        valid_temp[index].label = false;
        errorMsg[index].label = 'Invalid Label';
      }
      if (
        !valid_temp[index].detail ||
        (values[index].label && !values[index].detail)
      ) {
        flag = false;
        valid_temp[index].detail = false;
        errorMsg[index].detail = 'Invalid Detail';
      }
    }
    setDescriptions((prevState) => ({
      ...prevState,
      values: values,
      valid: valid_temp,
      errorMsg: errorMsg,
    }));
    if (flag) dispatchAction(postItem({ detail, descriptions, groupBuy }));
  };

  const handleGroupBuying = () => {
    setGroupBuy(!groupBuy);
  };

  const handleRedirect = () => {
    setRedirect(!redirect);
  };

  if (redirect) {
    return <Redirect to={ITEM_DETAIL_URL(item.id)} />;
  }

  return (
    <div className="container">
      {item.id && (
        <Alert
          variant="success"
          className="fixed-top"
          onClose={() => handleRedirect()}
          dismissible
        >
          Request Submitted
        </Alert>
      )}
      <Form className="p-5" onSubmit={handleSubmit}>
        {alert && (
          <Alert
            variant="danger"
            className="fixed-top"
            onClose={() => setAlert(false)}
            dismissible
          >
            Invalid Input
          </Alert>
        )}
        <TextInput
          controlName={`name`}
          label={`Item Name`}
          required={true}
          parentCallback={callBackDetail}
          REGX={STRING_WITH_NUMBER_SYMBOL}
          defaultErrorMsg={'Invalid Item Name'}
          placeholder={'Item Name'}
          errorMsg={error.name}
          defaultValue={detail.name}
        />
        <TextInput
          controlName={`quantity`}
          required={true}
          label={`Quantity`}
          maxLength={10}
          parentCallback={callBackDetail}
          REGX={NUMBERS_ONLY}
          errorMsg={error.quantity}
          defaultErrorMsg={'Only Numbers allowed'}
          defaultValue={detail.quantity}
          minValue="1"
        />

        <div className="form-row justify-content-between">
          <div className="col-4">
            <TextInput
              controlName={`max_amount`}
              required={true}
              label={`Max Amount (Per Item) (Rupees)`}
              maxLength={10}
              parentCallback={callBackDetail}
              REGX={NUMBERS_ONLY}
              errorMsg={error.max_amount}
              defaultErrorMsg={'Only Numbers allowed'}
              defaultValue={detail.max_amount}
            />
          </div>
          <div className="col-4">
            <label>
              Item Status
              <span className="text-danger">*</span>
            </label>
            <select
              className={`form-control ${error.status.length && 'is-invalid'}`}
              name="status"
              onChange={handleStatus}
            >
              <option value="">--- Select ---</option>
              <option value={NEW_ITEM}>New Item</option>
              <option value={SECOND_HAND}>Second Hand</option>
              <option value={OLD_ITEM}>Old Item</option>
            </select>
            {error.status && (
              <small className="invalid-feedback">{error.status}</small>
            )}
          </div>
          <div className="col-4">
            <label>
              Max Time to buy Item
              <span className="text-danger">*</span>
            </label>
            <DateTimePicker
              format="y/MM/dd h:mm:ss a"
              required
              onChange={handleDateChange}
              block
              value={detail.bidding_end_time}
            />
            {error.bidding_end_time && (
              <small className="text-danger d-block">
                {error.bidding_end_time}
              </small>
            )}
            <div>
              <small className="pl-2 text-muted">
                (Bidding will start 1 hr before this time.)
              </small>
            </div>
          </div>
        </div>

        <TextInput
          controlName={`description`}
          label={`Description`}
          required={true}
          parentCallback={callBackDetail}
          REGX={ALL_CHARACTER}
          textArea={true}
          defaultErrorMsg={'Invalid Description'}
          errorMsg={error.description}
          defaultValue={detail.description}
        />
        <div className="pb-3">
          <div className="d-flex">
            <div className="col-2 pl-0">Buy in Group: </div>
            <div>
              <input type="checkbox" onClick={handleGroupBuying} />
            </div>
          </div>
        </div>
        <div className="pb-1">
          Other Details: (optional)
          <button
            type="button"
            className="btn btn-link pt-1"
            onClick={() => handleAddFields()}
          >
            +
          </button>
        </div>
        <div className="form-row">
          {descriptions.values.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className={`col-5`}>
                <TextInput
                  controlName={`label`}
                  label={`Label`}
                  maxLength={40}
                  parentCallback={(value) => callBackDescriptions(value, index)}
                  errorMsg={descriptions.errorMsg[index].label}
                  defaultValue={inputField.label}
                />
              </div>

              <div className={`col-6`}>
                <TextInput
                  controlName={`detail`}
                  label={`Detail`}
                  maxLength={40}
                  parentCallback={(value) => callBackDescriptions(value, index)}
                  errorMsg={descriptions.errorMsg[index].detail}
                  defaultValue={inputField.detail}
                />
              </div>
              <b className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button>
              </b>
            </Fragment>
          ))}
        </div>
        <Button type="submit">Save</Button>
      </Form>
    </div>
  );
};

export default RequestItem;
