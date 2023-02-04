import { Box, Button, Divider } from '@mui/material';
import LunchOrdersTable from 'components/common/LunchOrdersTable';
import dayjs from 'dayjs';
import { useConfirmation } from 'providers/ConfirmationProvider';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserLunchOrder } from 'redux/slices/lunchOrderSlice';
import AddLunchItemDialog from './AddLunchItemDialog';

const Lunch = () => {
  const confirm = useConfirmation();
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const { lunchOrder } = useSelector(state => state.lunchOrders);
  const { currentUser } = useSelector(state => state.users);
  const [myOrder, setMyOrder] = useState('');
  console.log({ lunchOrder });

  const placeOrder = async () => {
    try {
      await confirm({
        variant: 'error',
        description: 'Are you sure you want to update this?'
      });
      await dispatch(
        addUserLunchOrder({
          id: lunchOrder?.id,
          userId: myOrder,
          add: false
        })
      ).unwarp();
    } catch (error) {
      console.log('no');
    }
  };

  useEffect(() => {
    setMyOrder(lunchOrder?.users?.find(user => user.includes(currentUser.id)));
  }, [lunchOrder]);

  return (
    <div>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <h3>{dayjs().format('DD MMM, YYYY')}</h3>
        <Divider variant="middle" />
      </Box>

      <LunchOrdersTable self />

      <Box sx={{ textAlign: 'center' }}>
        {!lunchOrder?.open && <h3>Order request is closed now.</h3>}
        {lunchOrder?.users
          ?.map(user => user.split('_')[0])
          ?.includes(currentUser.id) ? (
          <Button
            variant="contained"
            color="error"
            onClick={placeOrder}
            disabled={!lunchOrder?.open}
          >
            cancel order
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
            disabled={!lunchOrder?.open}
          >
            Place order
          </Button>
        )}
      </Box>
      <AddLunchItemDialog
        open={openDialog}
        setOpen={setOpenDialog}
        placeOrder={placeOrder}
      />
    </div>
  );
};

export default Lunch;
