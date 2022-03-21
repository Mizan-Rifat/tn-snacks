import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateUserDeposit } from 'redux/slices/usersSlice';

const EditDepositDialog = ({ open, setOpen, userId }) => {
  const [value, setValue] = useState(0);

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(updateUserDeposit({ userId, deposit: value }));
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Deposit</DialogTitle>
      <DialogContent sx={{ minWidth: 300 }}>
        <TextField
          label="Amount"
          variant="outlined"
          value={value}
          fullWidth
          onChange={e => setValue(e.target.value)}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDepositDialog;
