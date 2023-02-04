import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Tab,
  Tabs
} from '@mui/material';
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
import { addSnackOrder } from 'redux/slices/snackOrdersSlice';
import { addLunchOrder } from 'redux/slices/lunchOrderSlice';
import TabPanel from 'components/common/TabPanel';
import Snack from './Snack';
import Lunch from './Lunch';

export const FormDialog = ({ open, setOpen, type }) => {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const dispatch = useDispatch();

  const [lunchItem, setLunchItem] = React.useState([]);

  const handleChange = ({ target }) => {
    if (target.checked) {
      setLunchItem([...lunchItem, target.name]);
    } else {
      setLunchItem(lunchItem.filter(item => item !== target.name));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (type === 'snack') {
      dispatch(
        addSnackOrder({ date: dayjs(date).format(), status: true, open: true })
      );
    }
    if (type === 'lunch') {
      console.log({ lunchItem });
      dispatch(
        addLunchOrder({
          date: dayjs(date).format(),
          status: true,
          open: true,
          items: lunchItem
        })
      );
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={false}>
      <DialogTitle>Select Date</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          margin="dense"
          id="date"
          label="Date"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true
          }}
        />
        {type === 'lunch' && (
          <>
            <FormControl sx={{ mt: 2 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Lunch Items</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={lunchItem.includes('Fish')}
                      onChange={handleChange}
                      name="Fish"
                    />
                  }
                  label="Fish"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={lunchItem.includes('Chicken')}
                      onChange={handleChange}
                      name="Chicken"
                    />
                  }
                  label="Chicken"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={lunchItem.includes('Beef')}
                      onChange={handleChange}
                      name="Beef"
                    />
                  }
                  label="Beef"
                />
              </FormGroup>
            </FormControl>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          disabled={type === 'lunch' && !lunchItem.length}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AdminHome = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { loading } = useSelector(state => state.snackOrders);

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
