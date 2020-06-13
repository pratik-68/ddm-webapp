import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import ItemTable from '../../components/ItemTable';
import { isBuyer } from '../../utils';
import { myItems, myGroupItems } from '../../redux/actions/itemActions';
import { DASHBOARD_ROUTE } from '../../constants/route-constants';

const MyItems = ({ restricted = true }) => {
  const [itemPage, setItemPage] = useState({ currentPage: 1, totalPage: 0 });
  const [groupItemPage, setGroupItemPage] = useState({
    currentPage: 1,
    totalPage: 0,
  });
  const dispatchAction = useDispatch();
  const { userData, myItemList, myGroupItemList } = useSelector(
    (state) => ({
      userData: state.userReducer.user,
      myItemList: state.itemReducer.myItemList,
      myGroupItemList: state.itemReducer.myGroupItemList,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (isBuyer(userData.type_of_user)) {
      dispatchAction(myItems(itemPage.currentPage));
    }
  }, [userData.type_of_user, itemPage.currentPage, dispatchAction]);

  useEffect(() => {
    if (isBuyer(userData.type_of_user)) {
      dispatchAction(myGroupItems(groupItemPage.currentPage));
    }
  }, [userData.type_of_user, groupItemPage.currentPage, dispatchAction]);

  useEffect(() => {
    setItemPage((prevState) => ({
      ...prevState,
      totalPage: Math.ceil(myItemList.list_size / 10),
    }));
  }, [myItemList.list_size]);

  const itemPageChangeHandler = (index) => {
    if (itemPage.totalPage < index) index = itemPage.totalPage;
    else if (index < 1) index = 1;
    setItemPage({
      ...itemPage,
      currentPage: index,
    });
  };

  const groupItemPageChangeHandler = (index) => {
    if (groupItemPage.totalPage < index) index = groupItemPage.totalPage;
    else if (index < 1) index = 1;
    setGroupItemPage({
      ...groupItemPage,
      currentPage: index,
    });
  };

  return (
    <div className="container">
      <div className="p-5 my-5 rounded-lg shadow">
        {userData.type_of_user ? (
          isBuyer(userData.type_of_user) ? (
            <div>
              <div className="pb-3">
                <h2 className="pb-3 text-primary">
                  <u>My Requested Items</u>
                </h2>
              </div>
              <h3 className="pb-3 text-secondary">
                <u>Items List</u>
              </h3>
              <ItemTable
                tableData={myItemList.items}
                currentPage={itemPage.currentPage}
                totalPage={itemPage.totalPage}
                pageChangeHandler={itemPageChangeHandler}
              />
              <h3 className="pb-3 text-secondary">
                <u>Group Buying Items List</u>
              </h3>
              <ItemTable
                tableData={myGroupItemList.items}
                currentPage={groupItemPage.currentPage}
                totalPage={groupItemPage.totalPage}
                pageChangeHandler={groupItemPageChangeHandler}
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

export default MyItems;
