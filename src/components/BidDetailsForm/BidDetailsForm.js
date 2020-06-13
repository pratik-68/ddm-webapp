import React, { Fragment } from 'react';
import TransactionTable from '../TransactionTable';
import { to_DateTime } from '../../utils';

const BidDetailsForm = ({ bid = null }) => {
  return (
    <Fragment>
      {bid.id ? (
        <Fragment>
          <div className="pb-3">
            <div>
              <b>Title:</b> {bid.name}
            </div>
            {bid.images && bid.images.length ? (
              <div>
                <h3>Images: </h3>
                {bid.images.map((data, index) => {
                  return (
                    <div>
                      <img src={data} alt={index} />
                    </div>
                  );
                })}
              </div>
            ) : null}
            {bid.descriptions.length ? (
              <div>
                <h5>Descriptions: </h5>
                {bid.descriptions.map((data, index) => {
                  return (
                    <p className="text-capitalize" key={index}>
                      {index + 1}) {data.label}: {data.detail}
                    </p>
                  );
                })}
              </div>
            ) : null}
            {bid.amount ? (
              <div>
                <b>Amount:</b> {parseFloat(bid.amount)}
              </div>
            ) : null}
            {bid.status ? (
              <div>
                <b>Status:</b> {bid.status}
              </div>
            ) : null}
            <div>
              <b>Placed On:</b> {to_DateTime(bid.created_at)}
            </div>
          </div>
          {bid.transaction ? (
            <div className="container px-5 pb-5">
              <h4>Previous Transactions: </h4>
              <TransactionTable tableData={bid.transaction} />
            </div>
          ) : null}
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default BidDetailsForm;
