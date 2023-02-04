import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useLunchOrderhistory from 'hooks/useLunchOrderhistory';
import dayjs from 'dayjs';

const getTotalPrice = items =>
  items.reduce((acc, val) => acc + Number(val.price), 0);

const MyLunchHistory = () => {
  const { currentUser } = useSelector(state => state.users);
  const { completedLunchOrders } = useSelector(state => state.lunchOrders);

  useLunchOrderhistory();

  const [orders, setOrders] = useState(completedLunchOrders);

  useEffect(() => {
    setOrders(
      completedLunchOrders.filter(item => item.userId === currentUser.id)
    );
  }, [completedLunchOrders]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Cost</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{dayjs(row.date).format('DD MMM, YYYY')}</TableCell>
                <TableCell align="center">{row.price} /-</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell align="center">{getTotalPrice(orders)} /-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MyLunchHistory;
