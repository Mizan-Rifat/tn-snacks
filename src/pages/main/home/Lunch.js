import { Box, Button, Divider } from '@mui/material';
import LunchOrdersTable from 'components/common/LunchOrdersTable';
import dayjs from 'dayjs';
import { useConfirmation } from 'providers/ConfirmationProvider';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserLunchOrder } from 'redux/slices/lunchOrderSlice';

const Lunch = () => {
  const confirm = useConfirmation();

  const dispatch = useDispatch();
  const { lunchOrder } = useSelector(state => state.lunchOrders);
  const { currentUser, users } = useSelector(state => state.users);

  console.log({ currentUser, users });

  const placeOrder = async add => {
    try {
      await confirm({
        variant: 'error',
        description: 'Are you sure you want to update this?'
      });
      await dispatch(
        addUserLunchOrder({
          id: lunchOrder?.id,
          userId: currentUser.id,
          add
        })
      ).unwarp();
    } catch (error) {
      console.log('no');
    }
  };

  return (
    <div>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <h3>{dayjs().format('DD MMM, YYYY')}</h3>
        <Divider variant="middle" />
      </Box>

      <LunchOrdersTable />

      <Box sx={{ textAlign: 'center' }}>
        {!lunchOrder?.open && <h3>Order request is closed now.</h3>}
        {lunchOrder?.users?.includes(currentUser.id) ? (
          <Button
            variant="contained"
            color="error"
            onClick={() => placeOrder()}
            disabled={!lunchOrder?.open}
          >
            cancel order
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => placeOrder(true)}
            disabled={!lunchOrder?.open}
          >
            Place order
          </Button>
        )}
      </Box>
    </div>
  );
};

export default Lunch;
