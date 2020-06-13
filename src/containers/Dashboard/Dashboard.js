import React, { Fragment } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { isBuyer, isSeller } from '../../utils';
import AllItems from '../AllItems';
import Loading from '../../components/Loading';
import MyItems from '../MyItems';
import GroupBuyingItems from '../GroupBuyingItems';

const Dashboard = () => {
  const { userData } = useSelector(
    (state) => ({
      userData: state.userReducer.user,
    }),
    shallowEqual
  );

  return (
    <Fragment>
      {userData.type_of_user ? (
        <Fragment>
          {isSeller(userData.type_of_user) && <AllItems restricted={false} />}
          {isBuyer(userData.type_of_user) && (
            <Fragment>
              <GroupBuyingItems />
              <MyItems restricted={false} />
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};

export default Dashboard;
