import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'firebaseApp/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getFsData } from 'utils';
import useLunchOrderhistory from 'hooks/useLunchOrderhistory';
import dayjs from 'dayjs';
import { FilterAltOff } from '@mui/icons-material';

const getTotalPrice = items =>
  items.reduce((acc, val) => acc + Number(val.price), 0);

const LunchOrderHistory = () => {
  const completedLunchOrdersRef = collection(db, 'completedLunchOrders');
  const { currentUser } = useSelector(state => state.users);
  const dispatch = useDispatch();
  const { completedLunchOrders } = useSelector(state => state.lunchOrders);

  useLunchOrderhistory();

  const [orders, setOrders] = useState(completedLunchOrders);
  const [date, setDate] = useState('');
  const [user, setUser] = useState('');

  console.log({ orders, completedLunchOrders });

  const filterByDate = ({ target: { value } }) => {
    console.log(value);
    setUser('');
    setDate(value);

    setOrders(completedLunchOrders.filter(item => item.date === value));
  };

  const filterByUser = ({ target: { value } }) => {
    console.log(value);
    setUser(value);
    setDate('');

    setOrders(completedLunchOrders.filter(item => item.userName === value));
  };

  const handleFilterOff = () => {
    setUser('');
    setDate('');
    setOrders(completedLunchOrders);
  };

  useEffect(() => {
    setOrders(completedLunchOrders);
  }, [completedLunchOrders]);

  console.log({ completedLunchOrders });

  return (
    <>
      <Stack direction="row" sx={{ my: 2 }}>
        <FormControl margin="dense" fullWidth size="small" sx={{ mr: 2 }}>
          <InputLabel id="demo-simple-select-label">Date</InputLabel>
          <Select
            margin="dense"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Item"
            value={date}
            onChange={filterByDate}
          >
            {[...new Set(completedLunchOrders.map(item => item.date))].map(
              item => (
                <MenuItem key={item} value={item}>
                  {dayjs(item).format('DD MMM, YYYY')}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
        <FormControl margin="dense" fullWidth size="small">
          <InputLabel id="demo-simple-select-label">User</InputLabel>
          <Select
            margin="dense"
            labelId="demo-simple-select-label"
            value={user}
            id="demo-simple-select"
            label="Item"
            onChange={filterByUser}
          >
            {[...new Set(completedLunchOrders.map(item => item.userName))].map(
              item => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>

        {(user || date) && (
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={handleFilterOff}
          >
            <FilterAltOff />
          </IconButton>
        )}
      </Stack>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small" aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>User</TableCell>
              <TableCell align="center">Price</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map(row => (
              <TableRow key={row.id}>
                <TableCell>{dayjs(row.date).format('DD MMM, YYYY')}</TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell align="center">{row.price} /-</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={2} />
              <TableCell align="center">{getTotalPrice(orders)} /-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {user && (
        <Box
          sx={{
            textAlign: 'center'
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setOpen(true);
            }}
            sx={{ mb: 2 }}
          >
            Clear Orders
          </Button>
        </Box>
      )}
    </>
  );
};

export default LunchOrderHistory;
