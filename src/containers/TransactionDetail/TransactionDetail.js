import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { to_DateTime } from '../../utils';
import { clearNotFound } from '../../redux/actions/userActions';
import Error404 from '../../components/Error404/Error404';
import Loading from '../../components/Loading';
import { getTransaction } from '../../redux/actions/transactionActions';
import { Link } from 'react-router-dom';
import { ITEM_DETAIL_URL } from '../../constants/route-constants';

const TransactionDetail = (props) => {
  const dispatchAction = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatchAction(getTransaction(id));
  }, [dispatchAction, id]);

  useEffect(() => {
    dispatchAction(clearNotFound());
  }, [dispatchAction]);

  const { transaction, notFound } = useSelector(
    (state) => ({
      transaction: state.transactionReducer.transaction,
      notFound: state.userReducer.notFound,
    }),
    shallowEqual
  );

  if (notFound) {
    return <Error404 />;
  }

  return (
    <Fragment>
      {transaction.id ? (
        <Fragment>
          <div className="container my-5">
            <div className="card border-primary">
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title">
                    <u>Transaction Details:</u>
                  </h3>
                  {transaction.item ? (
                    <p className="card-text">
                      Item Name:{' '}
                      <Link to={ITEM_DETAIL_URL(transaction.item.id)}>
                        {transaction.item.name}
                      </Link>
                    </p>
                  ) : null}
                  <p className="card-text">
                    Description: {transaction.description}
                  </p>
                  <p className="card-text">Status: {transaction.status}</p>
                  <p className="card-text">
                    Placed On: {to_DateTime(transaction.created_at)}
                  </p>
                  <p className="card-text">
                    Updated At: {to_DateTime(transaction.updated_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};

export default TransactionDetail;
