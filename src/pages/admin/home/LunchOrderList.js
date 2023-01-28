import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import LunchOrdersTable from 'components/common/LunchOrdersTable';
import dayjs from 'dayjs';
import { useConfirmation } from 'providers/ConfirmationProvider';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  completeLunchOrders,
  updateLunchOrder
} from 'redux/slices/lunchOrderSlice';

const data = [
  {
    id: 1,
    user: 'Rifat',
    price: 90
  }
];

const LunchOrderList = () => {
  const confirm = useConfirmation();

  const dispatch = useDispatch();
  const { lunchOrder } = useSelector(state => state.lunchOrders);
  const { currentUser, users } = useSelector(state => state.users);

  const toggleOrderOpen = async () => {
    try {
      await confirm({
        variant: 'error',
        description: `Are you sure you want to ${
          lunchOrder.open ? 'stop' : 'start'
        } taking orders?`
      });

      console.log(lunchOrder.id);
      await dispatch(
        updateLunchOrder({
          id: lunchOrder.id,
          data: { open: !lunchOrder.open }
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const completeOrder = async () => {
    try {
      await confirm({
        variant: 'error',
        description: 'Are you sure you want to mark this order as complete?'
      });
      const data = lunchOrder.users?.map(item => {
        const user = users.find(user => user.id === item);
        return {
          date: lunchOrder.date,
          userName: user.name,
          price: 90,
          userId: item
        };
      });
      console.log({ data });

      await dispatch(completeLunchOrders(data)).unwarp();
    } catch (error) {
      console.log('no');
    }
  };

  return (
    <div>
      <LunchOrdersTable />
      <Stack spacing={1} sx={{ px: 6, py: 4 }}>
        <Button
          variant="outlined"
          color={lunchOrder.open ? 'error' : 'primary'}
          onClick={toggleOrderOpen}
        >
          {lunchOrder.open ? 'Stop' : 'Start'} taking orders
        </Button>
        <Button variant="contained" color="primary" onClick={completeOrder}>
          Mark order as complete
        </Button>
      </Stack>
    </div>
  );
};

export default LunchOrderList;
