import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { itemDetail } from '../../redux/actions/itemActions';
import ItemBidding from '../ItemBidding';
import { to_DateTime, isSeller, isBuyer } from '../../utils';
import BidsList from '../BidsList';
import { clearNotFound } from '../../redux/actions/userActions';
import Error404 from '../../components/Error404/Error404';
import Loading from '../../components/Loading';
import GroupBuying from '../GroupBuying';

const ItemDetail = (props) => {
  const dispatchAction = useDispatch();
  const id = props.match.params.id;
  useEffect(() => {
    dispatchAction(itemDetail(id));
  }, [dispatchAction, id]);

  useEffect(() => {
    dispatchAction(clearNotFound());
  }, [dispatchAction]);

  const { item, notFound, user } = useSelector(
    (state) => ({
      item: state.itemReducer.item,
      notFound: state.userReducer.notFound,
      user: state.userReducer.user,
    }),
    shallowEqual
  );
  const [biddingStarted, setBiddingStarted] = useState(false);
  const [biddingEnded, setBiddingEnded] = useState(false);

  useEffect(() => {
    const start_time = new Date(item.bidding_start_time);
    const end_time = new Date(item.bidding_end_time);
    const current_time = new Date();
    if (start_time < current_time) {
      setBiddingStarted(true);
      if (end_time < current_time) setBiddingEnded(true);
    }
  }, [item]);

  if (notFound) {
    return <Error404 />;
  }

  return (
    <Fragment>
      {item.id ? (
        <Fragment>
          <div className="container my-5">
            <div className="card border-primary">
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title">
                    <u>Item Details:</u>
                  </h3>
                  <p className="card-text">Name: {item.name}</p>
                  <p className="card-text">Description: {item.description}</p>
                  {item.quantity ? (
                    <p className="card-text">
                      Quantity: {parseInt(item.quantity)}
                    </p>
                  ) : null}
                  {item.current_quantity ? (
                    <p className="card-text">
                      Your Placed Quantity: {parseInt(item.current_quantity)}
                    </p>
                  ) : null}
                  <p className="card-text">
                    Max Amount(per item): Rs {parseFloat(item.max_amount)}
                  </p>
                  <p className="card-text">
                    Total Max Amount(For Bidding): Rs{' '}
                    {parseFloat(item.max_amount) * parseInt(item.quantity)}
                  </p>
                  <p className="card-text">Status: {item.status}</p>
                  <p className="card-text">
                    Bidding Start Time: {to_DateTime(item.bidding_start_time)}
                  </p>
                  <p className="card-text">
                    Bidding End Time: {to_DateTime(item.bidding_end_time)}
                  </p>
                  <p className="card-text">
                    Placed On: {to_DateTime(item.created_at)}
                  </p>
                  {item.winner_name ? (
                    <p className="card-text">Winner: {item.winner_name}</p>
                  ) : null}
                  {item.descriptions && item.descriptions.length ? (
                    <div>
                      <h4>
                        <u>Other Details:</u>
                      </h4>
                      {item.descriptions.map((data, index) => {
                        return (
                          <p className="card-text" key={index}>
                            {index + 1}) {data.label}: {data.detail}
                          </p>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {item.group_buying &&
          isBuyer(user.type_of_user) &&
          !biddingStarted &&
          !item.item_owner ? (
            <GroupBuying item_id={id} />
          ) : null}
          {item.item_owner && biddingStarted ? (
            <BidsList item_id={id} biddingEnded={biddingEnded} />
          ) : null}
          {!item.item_owner && isSeller(user.type_of_user) ? (
            <ItemBidding item_id={id} />
          ) : null}
        </Fragment>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};

export default ItemDetail;
