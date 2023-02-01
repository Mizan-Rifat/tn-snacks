import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useLunchOrderhistory from 'hooks/useLunchOrderhistory';
import EnhancedTable from 'components/common/EnhancedTable';

const LunchOrderHistory = () => {
  const { completedLunchOrders } = useSelector(state => state.lunchOrders);

  useLunchOrderhistory();

  const [orders, setOrders] = useState(completedLunchOrders);

  useEffect(() => {
    setOrders(completedLunchOrders);
  }, [completedLunchOrders]);

  return (
    <>
      <EnhancedTable
        orders={orders}
        setOrders={setOrders}
        completedLunchOrders={completedLunchOrders}
      />
    </>
  );
};

export default LunchOrderHistory;
