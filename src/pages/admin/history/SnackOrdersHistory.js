import {
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import AppBackdrop from 'components/backdrop/AppBackdrop';
import useSnackOrdersHistory from 'hooks/useSnackOrderHistory';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from 'utils';
import { getDebit } from '../users/Users';

const SnackOrdersHistory = () => {
  const [data, setData] = useState([]);
  const { completedSnackOrders, loading, currentUserCompletedSnackOrders } =
    useSelector(state => state.snackOrders);
  const { currentUser } = useSelector(state => state.users);

  useSnackOrdersHistory();

  useEffect(() => {
    currentUser.role === 'admin'
      ? setData(completedSnackOrders)
      : setData(currentUserCompletedSnackOrders);
  }, [completedSnackOrders, currentUserCompletedSnackOrders]);

  return (
    <>
      <AppBackdrop open={loading} />
      {currentUser.role !== 'admin' && (
        <>
          <Grid container columnSpacing={3}>
            <Grid item xs={6} sx={{ textAlign: 'end' }}>
              <p>
                Credit :{' '}
                <span style={{ fontWeight: 600 }}>
                  {(currentUser.deposit || 0) -
                    getDebit(
                      currentUser.id,
                      currentUserCompletedSnackOrders
                    )}{' '}
                  /-
                </span>
              </p>
            </Grid>
            <Grid item xs={6}>
              <p>
                Debit :{' '}
                <span style={{ fontWeight: 600 }}>
                  {getDebit(currentUser.id, currentUserCompletedSnackOrders)}
                  /-
                </span>
              </p>
            </Grid>
          </Grid>
          <Divider variant="middle" sx={{ mb: 2 }} />
        </>
      )}
      <TableContainer component={Paper}>
        <Table size="small" aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Item</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Total Cost</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map(row => (
              <TableRow key={row.id}>
                <TableCell>{formatDate(row.date)}</TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.itemName}</TableCell>
                <TableCell align="center">{row.qty}</TableCell>
                <TableCell align="center">{row.itemPrice} /-</TableCell>
                <TableCell align="center">{row.totalPrice} /-</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SnackOrdersHistory;