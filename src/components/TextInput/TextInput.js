import React, { memo, useEffect, useRef, useState } from 'react';
import { STRING, NUMBERS_ONLY } from '../../constants/common-constants';

const TextInput = ({
  parentCallback,
  controlName,
  label,
  placeholder = '',
  required = false,
  minLength = 0,
  maxLength = 100,
  REGX = STRING,
  defaultValue = '',
  defaultErrorMsg = 'Characters only',
  errorMsg = '',
  type = 'text',
  textArea = false,
  maxValue = null,
  minValue = null,
}) => {
  const errorMessage = useRef(errorMsg);
  const [textValue, setTextValue] = useState(defaultValue);

  const validateText = (value) => {
    value = value.trim();
    if (required && !value.length) {
      errorMessage.current = "This field can't be blank";
    } else if (!REGX.test(value)) {
      errorMessage.current = defaultErrorMsg;
    } else if (value.length < minLength) {
      errorMessage.current = `Character length must be grater than ${minLength}`;
    } else if (maxLength < value.length) {
      errorMessage.current = `Character length must be less than ${maxLength}`;
    } else if (
      maxValue &&
      REGX === NUMBERS_ONLY &&
      parseInt(value) > maxValue
    ) {
      errorMessage.current = `Value must be smaller than or equal to ${maxValue}`;
    } else if (
      minValue &&
      REGX === NUMBERS_ONLY &&
      parseInt(value) < minValue
    ) {
      errorMessage.current = `Value must be greater than or equal to ${minValue}`;
    } else {
      errorMessage.current = '';
      parentCallback({
        name: controlName,
        data: value,
        valid: true,
        errorMsg: '',
      });
      return;
    }
    parentCallback({
      name: controlName,
      data: value,
      valid: false,
      errorMsg: errorMessage.current,
    });
  };

  useEffect(() => {
    errorMessage.current = errorMsg;
  }, [errorMsg]);

  useEffect(() => {
    setTextValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="pb-3">
      <label>
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      {textArea ? (
        <textarea
          className={`form-control ${
            errorMessage.current.length && 'is-invalid'
          }`}
          name={controlName}
          rows="5"
          value={textValue}
          placeholder={placeholder}
          onChange={(e) => {
            setTextValue(e.target.value);
            // validateText(e.target.value);
          }}
          onBlur={(e) => {
            // setTextValue(e.target.value);
            validateText(e.target.value);
          }}
          maxLength={maxLength}
        />
      ) : (
        <input
          className={`form-control ${
            errorMessage.current.length && 'is-invalid'
          }`}
          type={type}
          name={controlName}
          value={textValue}
          placeholder={placeholder}
          onChange={(e) => {
            setTextValue(e.target.value);
            // validateText(e.target.value);
          }}
          onBlur={(e) => {
            // setTextValue(e.target.value);
            validateText(e.target.value);
          }}
          maxLength={maxLength}
        />
      )}

      {errorMessage.current && (
        <small className="invalid-feedback">{errorMessage.current}</small>
      )}
    </div>
  );
};

export default memo(TextInput);
