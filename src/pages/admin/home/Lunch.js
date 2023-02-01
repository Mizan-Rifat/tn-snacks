import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { FormDialog } from './AdminHome';
import { useSelector } from 'react-redux';
import LunchOrderList from './LunchOrderList';

const Lunch = () => {
  const [open, setOpen] = useState(false);

  const { lunchOrder } = useSelector(state => state.lunchOrders);

  if (lunchOrder) {
    return <LunchOrderList />;
  } else {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '70vh',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setOpen(true);
            }}
            sx={{ mb: 2 }}
          >
            Start taking lunch orders
          </Button>
        </Box>
        <FormDialog open={open} setOpen={setOpen} type="lunch" />
      </>
    );
  }
};

export default Lunch;
