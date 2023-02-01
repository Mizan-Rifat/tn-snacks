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
import dayjs from 'dayjs';
import { useConfirmation } from 'providers/ConfirmationProvider';
import React from 'react';

const data = [
  {
    id: 1,
    user: 'Rifat',
    price: 90
  }
];

const Lunch = () => {
  const confirm = useConfirmation();

  const placeOrder = async () => {
    try {
      await confirm({
        variant: 'error',
        description: 'Are you sure you want to place an order?'
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
  return (
    <div>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small" aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="center">Price</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.user}</TableCell>
                <TableCell align="center">{row.price}/-</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={1} sx={{ px: 6, py: 4 }}>
        <Button
          variant="outlined"
          // color={snackOrder.open ? 'error' : 'primary'}
          // onClick={toggleOrderOpen}
        >
          Start taking orders
        </Button>
        <Button variant="contained" color="primary">
          Mark order as complete
        </Button>
      </Stack>
    </div>
  );
};

export default Lunch;
