import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyPagination from '../MyPagination';
import { to_DateTime } from '../../utils';
import { BID_DETAIL_URL } from '../../constants/route-constants';

const BidsListTable = ({
  item_id,
  bidsData,
  currentPage,
  totalPage,
  pageChangeHandler,
}) => {
  return (
    <div>
      <Table
        striped
        responsive
        bordered
        hover
        size="sm"
        className="mb-3 text-center"
      >
        <thead>
          <tr>
            <th width="10">S.No.</th>
            <th>Title</th>
            <th>Status</th>
            <th>Placed On</th>
          </tr>
        </thead>
        <tbody>
          {bidsData ? (
            bidsData.length ? (
              bidsData.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{(currentPage - 1) * 10 + index + 1}</td>
                    <td>
                      <Link to={BID_DETAIL_URL(item_id, data.id)}>
                        {data.name}
                      </Link>
                    </td>
                    <td>{data.status}</td>
                    <td>{to_DateTime(data.created_at)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No Data Available
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                Data Loading...
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <MyPagination
        totalPage={totalPage}
        currentPage={currentPage}
        pageChangeHandler={pageChangeHandler}
      />
    </div>
  );
};

export default BidsListTable;
