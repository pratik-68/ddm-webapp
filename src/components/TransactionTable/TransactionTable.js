import React from 'react';
import { Table } from 'react-bootstrap';
import { to_DateTime } from '../../utils';
import { TRANSACTION_DETAIL_URL } from '../../constants/route-constants';
import { Link } from 'react-router-dom';

const TransactionTable = ({ tableData = null }) => {
  return (
    <Table striped responsive bordered hover size="sm" className="mb-3">
      <thead>
        <tr>
          <th width="10">S.No.</th>
          <th>Transaction id</th>
          <th>Bid Amount</th>
          <th>Paid Amount</th>
          <th>Status</th>
          <th>Type</th>
          <th>Placed On</th>
        </tr>
      </thead>
      <tbody>
        {tableData ? (
          tableData.length ? (
            tableData.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={TRANSACTION_DETAIL_URL(data.id)}>
                      {data.transaction_id}
                    </Link>
                  </td>
                  <td>{parseFloat(data.amount)}</td>
                  <td>{parseFloat(data.paid_amount)}</td>
                  <td>{data.status}</td>
                  <td>{data.transaction_type}</td>
                  <td>{to_DateTime(data.created_at)}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
                No Data Available
              </td>
            </tr>
          )
        ) : (
          <tr>
            <td colSpan={7} className="text-center">
              Data Loading...
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TransactionTable;
