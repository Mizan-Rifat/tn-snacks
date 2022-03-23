import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Edit } from '@mui/icons-material';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'firebaseApp/firebase';
import { getFsData } from 'utils';
import { setLoadingTrue, usersfetched } from 'redux/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import AppBackdrop from 'components/backdrop/AppBackdrop';
import useSnackOrdersHistory from 'hooks/useSnackOrderHistory';
import EditDepositDialog from './EditDepositDialog';

export const getDebit = (user, orders) =>
  orders
    .filter(order => order.userId === user)
    .reduce((acc, val) => val.totalPrice + acc, 0);

const Users = () => {
  const usersRef = collection(db, 'users');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [toralCredits, setTotalCredits] = useState(0);

  const { users, loading } = useSelector(state => state.users);
  const { completedSnackOrders, loading: snackOrdersLoading } = useSelector(
    state => state.snackOrders
  );

  useSnackOrdersHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const total = users
      .filter(user => user.deposit)
      .reduce(
        (acc, val) =>
          acc + (val.deposit - getDebit(val.id, completedSnackOrders)),
        0
      );
    setTotalCredits(total);
  }, [completedSnackOrders, users]);

  useEffect(() => {
    if (!users.length) {
      dispatch(setLoadingTrue());
      onSnapshot(usersRef, snapshot => {
        const users = snapshot.docs.map(doc => getFsData(doc));
        dispatch(usersfetched(users));
      });
    }
  }, []);

  return (
    <>
      <AppBackdrop open={loading || snackOrdersLoading} />
      <TableContainer component={Paper}>
        <Table size="small" aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">Deposit</TableCell>
              <TableCell align="right">Debit</TableCell>
              <TableCell align="right">Credit</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="center">{row.deposit || 0} /-</TableCell>
                <TableCell align="center">
                  {getDebit(row.id, completedSnackOrders) || 0} /-
                </TableCell>
                <TableCell align="center">
                  {(row.deposit || 0) -
                    getDebit(row.id, completedSnackOrders) || 0}{' '}
                  /-
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                      setSelectedUserId(row.id);
                      setOpenDialog(true);
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="center">
                Total
              </TableCell>
              <TableCell colSpan={2}>{toralCredits} /-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <EditDepositDialog
        open={openDialog}
        setOpen={setOpenDialog}
        userId={selectedUserId}
      />
    </>
  );
};

export default Users;
