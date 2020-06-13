import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { groupBuyingItems } from '../../redux/actions/itemActions';
import Loading from '../../components/Loading';
import GroupBuyingItemsTable from '../../components/GroupBuyingItemsTable';
import { isBuyer } from '../../utils';
import { Redirect } from 'react-router-dom';
import { DASHBOARD_ROUTE } from '../../constants/route-constants';

const GroupBuyingItems = ({ restricted = true }) => {
  const dispatchAction = useDispatch();
  const [page, setPage] = useState({ currentPage: 1, totalPage: 0 });
  const { userData, groupBuyingitemsList } = useSelector(
    (state) => ({
      userData: state.userReducer.user,
      groupBuyingitemsList: state.itemReducer.groupBuyingitemsList,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (isBuyer(userData.type_of_user))
      dispatchAction(groupBuyingItems(page.currentPage));
  }, [page.currentPage, dispatchAction, userData.type_of_user]);

  useEffect(() => {
    setPage((prevState) => ({
      ...prevState,
      totalPage: Math.ceil(groupBuyingitemsList.list_size / 10),
    }));
  }, [groupBuyingitemsList.list_size]);

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
          isBuyer(userData.type_of_user) ? (
            <div>
              <div className="d-flex justify-content-between pb-3">
                <h2 className="pb-3 text-primary">
                  <u>Group Buying Items</u>
                </h2>
              </div>
              <GroupBuyingItemsTable
                tableData={groupBuyingitemsList.items}
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

export default GroupBuyingItems;
