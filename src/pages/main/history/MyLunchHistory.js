import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
  const [month, setMonth] = useState('');
  const filterByMonth = ({ target: { value } }) => {
    console.log(value);
    // setUser(value);
    setMonth(value);

    setOrders(orders.filter(item => dayjs(item.date).format('MMMM') === value));
  };

  useEffect(() => {
    setOrders(
      completedLunchOrders.filter(item => item.userId === currentUser.id)
    );
  }, [completedLunchOrders]);

  return (
    <>
      <FormControl margin="dense" fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel id="demo-simple-select-label">Month</InputLabel>
        <Select
          margin="dense"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Item"
          value={month}
          onChange={filterByMonth}
        >
          {[
            ...new Set(
              completedLunchOrders.map(item => dayjs(item.date).format('MMMM'))
            )
          ].map(item => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
