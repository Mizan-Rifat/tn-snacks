import * as React from 'react';
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
import { Button, Divider } from '@mui/material';
import useOrdersHook from 'hooks/useOrdersHooks';
import { useDispatch, useSelector } from 'react-redux';
import { completeSnackOrders } from 'redux/slices/snackOrdersSlice';
import { Navigate } from 'react-router-dom';
import { formatDate } from 'utils';
import { useConfirmation } from 'providers/ConfirmationProvider';

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

  return snackOrder ? (
    <>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <h3>{formatDate(snackOrder.date, true)}</h3>
        <Divider variant="middle" />
      </Box>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Item</TableCell>
              <TableCell align="center">Qty.</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userOrders.map(row => (
              <TableRow key={row.name}>
                <TableCell>{row.user}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="center">{row.qty}</TableCell>
                <TableCell align="center">{row.price * row.qty}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleDeleteOrder(row.id)}
                  >
                    <CancelIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {getSumOfOrders(userOrders).map((row, index) => (
              <TableRow key={row}>
                {index === 0 && <TableCell rowSpan={userOrders.length} />}
                <TableCell>{row.name}</TableCell>
                <TableCell align="center" colSpan={2}>
                  {row.qty}
                </TableCell>
                <TableCell align="center">{row.price} /=</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ textAlign: 'center', my: 3 }}>
        <Button variant="contained" color="primary" onClick={completeOrder}>
          Mark order as complete
        </Button>
      </Box>
    </>
  ) : (
    <Navigate to="/admin" />
  );
};

export default OrderList;
