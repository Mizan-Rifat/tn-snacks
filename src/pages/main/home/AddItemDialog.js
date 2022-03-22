import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import {
  Button,
  ButtonGroup,
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
import {
  addUserSnackOrder,
  updateUserSnackOrder
} from 'redux/slices/snackOrdersSlice';

const AddItemDialog = ({ open, setOpen, snackItem }) => {
  const [selectedItem, setSelectedItem] = useState({});
  const [qty, setQty] = useState(0);

  const { items } = useSelector(state => state.snackItems);
  const { currentUser } = useSelector(state => state.users);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    setSelectedItem({});
    setQty(0);
  };

  const handleChange = ({ target: { value } }) => {
    setSelectedItem(value);
    setQty(1);
  };

  const handleSubmit = () => {
    console.log({ snackItem });
    // dispatch(
    //   addUserSnackOrder({
    //     itemId: selectedItem.id,
    //     qty,
    //     uid: currentUser.id
    //   })
    // );
    dispatch(
      updateUserSnackOrder({
        id: selectedItem.id,
        data: {
          qty
        }
      })
    );
    setOpen(false);
  };

  useEffect(() => {
    setSelectedItem(items.find(item => item.id === snackItem.itemId) || {});
    setQty(snackItem.qty || 0);
  }, [snackItem]);

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
            value={selectedItem}
          >
            {items.map(item => (
              <MenuItem key={item.id} value={item}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ textAlign: 'center' }}>
          <ButtonGroup
            size="small"
            variant="outlined"
            aria-label="outlined primary button group"
          >
            <Button onClick={() => qty > 0 && setQty(qty - 1)}>-</Button>
            <Button sx={{ pointerEvents: 'none' }}>{qty}</Button>
            <Button onClick={() => setQty(qty + 1)}>+</Button>
          </ButtonGroup>
          <p style={{ marginBottom: 0 }}>
            Price : {(selectedItem.price || 0) * qty}/-
          </p>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemDialog;
