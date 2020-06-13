import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getMyTransactions } from '../../redux/actions/transactionActions';
import Loading from '../../components/Loading';
import TransactionTable from '../../components/TransactionTable';

const MyTransactions = () => {
  const [page, setPage] = useState({ currentPage: 1, totalPage: 0 });
  const dispatchAction = useDispatch();
  const { transactionList } = useSelector(
    (state) => ({
      transactionList: state.transactionReducer.transactionList,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatchAction(getMyTransactions(page.currentPage));
  }, [page.currentPage, dispatchAction]);

  useEffect(() => {
    setPage((prevState) => ({
      ...prevState,
      totalPage: Math.ceil(transactionList.list_size / 10),
    }));
  }, [transactionList.list_size]);

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
        {transactionList && transactionList.transactions ? (
          <div>
            <div className="d-flex justify-content-between pb-3">
              <h2 className="pb-3 text-primary">
                <u>My Transactions:</u>
              </h2>
            </div>
            <TransactionTable
              tableData={transactionList.transactions}
              currentPage={page.currentPage}
              totalPage={page.totalPage}
              pageChangeHandler={pageChangeHandler}
            />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default MyTransactions;
