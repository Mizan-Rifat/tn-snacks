import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addUserLunchOrder } from 'redux/slices/lunchOrderSlice';

const AddLunchItemDialog = ({ open, setOpen }) => {
  const [selectedItem, setSelectedItem] = useState('');

  console.log({ selectedItem });

  const { lunchOrder } = useSelector(state => state.lunchOrders);

  const { currentUser } = useSelector(state => state.users);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = ({ target: { value } }) => {
    setSelectedItem(value);
  };

  const placeOrder = async () => {
    try {
      await dispatch(
        addUserLunchOrder({
          id: lunchOrder?.id,
          userId: `${currentUser.id}_${selectedItem}`,
          add: true
        })
      );
      handleClose();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Select item</DialogTitle>
      <DialogContent sx={{ minWidth: 300 }}>
        <FormControl margin="dense" fullWidth sx={{ mt: 1, mb: 2 }}>
          <InputLabel id="demo-simple-select-label">Item</InputLabel>
          <Select
            margin="dense"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Item"
            onChange={handleChange}
          >
            {lunchOrder?.items?.map(item => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={placeOrder} disabled={!selectedItem}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLunchItemDialog;
