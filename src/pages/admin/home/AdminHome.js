import { Box, Button, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import useOrdersHook from 'hooks/useOrdersHooks';
import AppBackdrop from 'components/backdrop/AppBackdrop';
import { Navigate } from 'react-router-dom';
import { addSnackOrder } from 'redux/slices/snackOrdersSlice';
import { addLunchOrder } from 'redux/slices/lunchOrderSlice';
import TabPanel from 'components/common/TabPanel';
import Snack from './Snack';
import Lunch from './Lunch';

export const FormDialog = ({ open, setOpen, type }) => {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (type === 'snack')
      dispatch(
        addSnackOrder({ date: dayjs(date).format(), status: true, open: true })
      );
    if (type === 'lunch')
      dispatch(
        addLunchOrder({ date: dayjs(date).format(), status: true, open: true })
      );

    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Select Date</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="date"
          label="Date"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

const AdminHome = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('snacks');

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { snackOrder, loading } = useSelector(state => state.snackOrders);

  useOrdersHook();

  return (
    !loading && (
      <>
        <AppBackdrop open={loading} />
        <Tabs value={value} onChange={handleChange} centered sx={{ mb: 2 }}>
          <Tab label="Snacks" />
          <Tab label="Lunch" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Snack />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Lunch />
        </TabPanel>
      </>
    )
  );
};

export default AdminHome;
