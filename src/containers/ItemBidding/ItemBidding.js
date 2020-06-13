import React, { Fragment, useEffect } from 'react';
import BidPlace from '../BidPlace';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getBidsList } from '../../redux/actions/bidActions';
import { to_DateTime } from '../../utils';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BID_DETAIL_URL } from '../../constants/route-constants';

const ItemBidding = ({ item_id }) => {
  const dispatchAction = useDispatch();
  const { bidsList } = useSelector(
    (state) => ({
      bidsList: state.bidReducer.bidsList.bids,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatchAction(getBidsList(item_id));
  }, [dispatchAction, item_id]);

  return (
    <Fragment>
      <BidPlace item_id={item_id} />
      {bidsList && bidsList.length ? (
        <div className="container">
          <div className="p-5 my-5 rounded-lg shadow">
            <h2 className="pb-3 text-primary">
              <u>Placed Bids</u>
            </h2>
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
                  <th>Bid Amount</th>
                  <th>Placed On</th>
                </tr>
              </thead>
              <tbody>
                {bidsList.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={BID_DETAIL_URL(item_id, data.id)}>
                          {data.name}
                        </Link>
                      </td>
                      <td>{data.status}</td>
                      <td>Rs {parseFloat(data.amount)}</td>
                      <td>{to_DateTime(data.created_at)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default ItemBidding;
