import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { FormDialog } from './AdminHome';
import { useSelector } from 'react-redux';
import SnackOrderList from './SnackOrderList';

const Snack = () => {
  const [open, setOpen] = useState(false);

  const { snackOrder } = useSelector(state => state.snackOrders);

  if (snackOrder) {
    return <SnackOrderList />;
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
            color="primary"
            onClick={() => {
              setOpen(true);
            }}
            sx={{ mb: 2 }}
          >
            Start taking snack orders
          </Button>
        </Box>
        <FormDialog open={open} setOpen={setOpen} type="snack" />
      </>
    );
  }
};

export default Snack;
