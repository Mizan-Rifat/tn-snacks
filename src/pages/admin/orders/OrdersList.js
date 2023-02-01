import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Divider, Tab, Tabs } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { formatDate, groupBy } from 'utils';
import TabPanel from 'components/common/TabPanel';
import Snack from './Snack';
import Lunch from './Lunch';

const OrderList = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [setGroupedUserOrders] = useState({});
  const { snackOrder, userOrders } = useSelector(state => state.snackOrders);

  useEffect(() => {
    setGroupedUserOrders(groupBy(userOrders, 'uid'));
  }, [userOrders]);

  return snackOrder ? (
    <>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <h3>{formatDate(snackOrder.date, true)}</h3>
        <Divider variant="middle" />
      </Box>

      <Tabs value={value} onChange={handleChange} centered sx={{ mb: 2 }}>
        <Tab label="Snacks" />
        <Tab label="Lunch" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Snack />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Lunch />
      </TabPanel>
    </>
  ) : (
    <Navigate to="/admin" />
  );
};

export default OrderList;
