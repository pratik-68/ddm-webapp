import React, { useEffect, useState } from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { items } from '../../redux/actions/itemActions';
import { isSeller } from '../../utils';
import { Redirect } from 'react-router-dom';
import { DASHBOARD_ROUTE } from '../../constants/route-constants';
import Loading from '../../components/Loading';
import AllItemTable from '../../components/AllItemTable';

const AllItems = ({ restricted = true, ...props }) => {
  const [page, setPage] = useState({ currentPage: 1, totalPage: 0 });
  const dispatchAction = useDispatch();
  const { userData, itemList } = useSelector(
    (state) => ({
      userData: state.userReducer.user,
      itemList: state.itemReducer.itemList,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (isSeller(userData.type_of_user))
      dispatchAction(items(page.currentPage));
  }, [userData.type_of_user, page.currentPage, dispatchAction]);

  useEffect(() => {
    setPage((prevState) => ({
      ...prevState,
      totalPage: Math.ceil(itemList.list_size / 10),
    }));
  }, [itemList.list_size]);

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
        {userData.type_of_user ? (
          isSeller(userData.type_of_user) ? (
            <div>
              <div className="pb-3">
                <h2 className="pb-3 text-primary">
                  <u>Active Requested Items</u>
                </h2>
              </div>
              <AllItemTable
                tableData={itemList.items}
                currentPage={page.currentPage}
                totalPage={page.totalPage}
                pageChangeHandler={pageChangeHandler}
              />
            </div>
          ) : (
            restricted && <Redirect to={DASHBOARD_ROUTE} />
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default AllItems;
