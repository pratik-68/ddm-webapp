// IMPORTING REACT
import React from 'react';

// ERROR FUNCTION FOR SHOWING ERROR IF USER GOES TO INVALID URL
const Error404 = () => {
  return (
    <div className="container">
      <h1 className="text-center secondary m-3 p-4">
        <b>Error 404 : Invalid Link</b>
      </h1>
    </div>
  );
};

export default Error404;
