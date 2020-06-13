import React, { useEffect, useState } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { getBidsList } from '../../redux/actions/bidActions';
import BidsListTable from '../../components/BidsListTable';

const BidsList = ({ item_id, biddingEnded }) => {
  const dispatchAction = useDispatch();
  const [page, setPage] = useState({ currentPage: 1, totalPage: 0 });

  const { bidsList } = useSelector(
    (state) => ({
      bidsList: state.bidReducer.bidsList,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatchAction(getBidsList(item_id, page.currentPage));
  }, [dispatchAction, item_id, page.currentPage]);

  useEffect(() => {
    setPage((prevState) => ({
      ...prevState,
      totalPage: Math.ceil(bidsList.list_size / 10),
    }));
  }, [bidsList.list_size]);

  const pageChangeHandler = (index) => {
    if (page.totalPage < index) index = page.totalPage;
    else if (index < 1) index = 1;
    setPage({
      ...page,
      currentPage: index,
    });
  };

  return (
    <div className="container">
      <div className="p-5 my-5 rounded-lg shadow">
        <div className="d-flex justify-content-between pb-3">
          <h2 className="pb-3 text-primary">
            {biddingEnded ? <u>All Placed Bids</u> : <u>Active Bids</u>}
          </h2>
        </div>
        <BidsListTable
          bidsData={bidsList.bids}
          currentPage={page.currentPage}
          totalPage={page.totalPage}
          pageChangeHandler={pageChangeHandler}
          item_id={item_id}
        />
      </div>
    </div>
  );
};

export default BidsList;
