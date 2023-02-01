import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const LunchOrdersTable = () => {
  const { lunchOrder } = useSelector(state => state.lunchOrders);
  const { users } = useSelector(state => state.users);
  console.log({ lunchOrder });

  return (
    <TableContainer component={Paper} sx={{ mb: 2 }}>
      <Table size="small" aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="center">Price</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {lunchOrder?.users
            ?.map(item => users.find(user => user.id === item))
            .map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="center">90/-</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LunchOrdersTable;
