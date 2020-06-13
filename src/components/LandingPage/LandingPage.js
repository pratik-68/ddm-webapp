import React from 'react';

// LANDING FUNCTION FOR SHOWING LANDING PAGE AFTER USER SIGN UP
const landing = () => {
  return (
    <div className="container p-4 text-center">
      <h2 className="text-primary">
        <b>You will receive an email with the verification link.</b>
      </h2>
      <h3>Please Verify through the link to Signup.</h3>
    </div>
  );
};

export default landing;
