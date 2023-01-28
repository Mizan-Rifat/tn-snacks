import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import { Button, Divider, Stack, Tab, Tabs } from '@mui/material';
import useOrdersHook from 'hooks/useOrdersHooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  completeSnackOrders,
  updateSnackOrder
} from 'redux/slices/snackOrdersSlice';
import { Navigate } from 'react-router-dom';
import { formatDate, getTotal, groupBy } from 'utils';
import { useConfirmation } from 'providers/ConfirmationProvider';
import TabPanel from 'components/common/TabPanel';
import Snack from './Snack';
import Lunch from './Lunch';

const getSumOfOrders = data => {
  const groupedData = data.reduce((acc, val) => {
    const qty = (acc[val.name]?.qty || 0) + val.qty;
    acc[val.name] = { qty, price: qty * val.price };
    return acc;
  }, {});

  return Object.keys(groupedData).map(item => ({
    ...groupedData[item],
    name: item
  }));
};
const OrderList = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [groupedUserOrders, setGroupedUserOrders] = useState({});
  const { snackOrder, userOrders } = useSelector(state => state.snackOrders);
  const { handleDeleteOrder } = useOrdersHook();

  const confirm = useConfirmation();

  const dispatch = useDispatch();

  const completeOrder = async () => {
    try {
      await confirm({
        variant: 'error',
        description: 'Are you sure you want to mark this order as complete?'
      });
      const data = userOrders.map(order => ({
        date: snackOrder.date,
        itemId: order.itemId,
        itemName: order.name,
        itemPrice: order.price,
        totalPrice: order.price * order.qty,
        qty: order.qty,
        userName: order.user,
        userId: order.uid
      }));

      await dispatch(completeSnackOrders(data)).unwarp();
    } catch (error) {
      console.log('no');
    }
  };

  const toggleOrderOpen = async () => {
    try {
      await confirm({
        variant: 'error',
        description: `Are you sure you want to ${
          snackOrder.open ? 'stop' : 'start'
        } taking orders?`
      });

      await dispatch(
        updateSnackOrder({
          id: snackOrder.id,
          data: { open: !snackOrder.open }
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

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
