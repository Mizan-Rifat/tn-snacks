import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack
} from '@mui/material';
import { FilterAltOff } from '@mui/icons-material';
import { useState } from 'react';
import { useConfirmation } from 'providers/ConfirmationProvider';
import { deleteCompleteLunchOrders } from 'redux/slices/lunchOrderSlice';
import { useDispatch } from 'react-redux';

const getTotalPrice = items =>
  items.reduce((acc, val) => acc + Number(val.price), 0);

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>

        <TableCell>Date</TableCell>
        <TableCell>User</TableCell>
        <TableCell align="center">Price</TableCell>
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar({
  selected,
  setSelected,
  setOrders,
  completedLunchOrders
}) {
  const [date, setDate] = useState('');
  const [user, setUser] = useState('');
  const [month, setMonth] = useState('');
  const numSelected = selected.length;
  const dispatch = useDispatch();
  const filterByDate = ({ target: { value } }) => {
    console.log(value);
    setUser('');
    setDate(value);

    setOrders(completedLunchOrders.filter(item => item.date === value));
  };
  const confirm = useConfirmation();
  const filterByUser = ({ target: { value } }) => {
    console.log(value);
    setUser(value);
    setDate('');

    setOrders(completedLunchOrders.filter(item => item.userName === value));
  };
  const filterByMonth = ({ target: { value } }) => {
    console.log(value);
    // setUser(value);
    setMonth(value);

    setOrders(
      completedLunchOrders.filter(
        item =>
          item.userName === user && dayjs(item.date).format('MMMM') === value
      )
    );
  };

  const handleDelete = async () => {
    console.log({ selected });
    try {
      await confirm({
        variant: 'error',
        description: 'Are you sure you want to delete this rows?'
      });
      dispatch(deleteCompleteLunchOrders(selected));
      setSelected([]);
    } catch (error) {
      console.log('no');
    }
  };

  const handleFilterOff = () => {
    setUser('');
    setDate('');
    setOrders(completedLunchOrders);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Stack direction="row" sx={{ my: 2, width: '100%' }}>
          <FormControl margin="dense" fullWidth size="small" sx={{ mr: 2 }}>
            <InputLabel id="demo-simple-select-label">User</InputLabel>
            <Select
              margin="dense"
              labelId="demo-simple-select-label"
              value={user}
              id="demo-simple-select"
              label="Item"
              onChange={filterByUser}
            >
              {[
                ...new Set(completedLunchOrders.map(item => item.userName))
              ].map(item => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {user ? (
            <FormControl margin="dense" fullWidth size="small">
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
                    completedLunchOrders.map(item =>
                      dayjs(item.date).format('MMMM')
                    )
                  )
                ].map(item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <FormControl margin="dense" fullWidth size="small">
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
          )}

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
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function EnhancedTable({
  orders,
  setOrders,
  completedLunchOrders
}) {
  const [selected, setSelected] = React.useState([]);

  console.log({ selected });

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = orders.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          selected={selected}
          setSelected={setSelected}
          setOrders={setOrders}
          completedLunchOrders={completedLunchOrders}
        />
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="small">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={orders.length}
            />
            <TableBody>
              {orders.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={event => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {dayjs(row.date).format('DD MMM, YYYY')}
                    </TableCell>
                    <TableCell>{row.userName}</TableCell>
                    <TableCell align="center">{row.price} /-</TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell align="center">{getTotalPrice(orders)} /-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
