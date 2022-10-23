import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField
} from '@mui/material';
import AppBackdrop from 'components/backdrop/AppBackdrop';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  addSnacksItem,
  fetchSnacksItem,
  resetItem,
  updateSnacksItem
} from 'redux/slices/snackItemsSlice';

const PutItem = () => {
  const { item: itemId } = useParams();
  const navigate = useNavigate();

  const { item, loading } = useSelector(state => state.snackItems);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();
  const onSubmit = async formData => {
    if (itemId) {
      await dispatch(updateSnacksItem({ itemId, formData })).unwrap();
      navigate('/admin/items');
    } else {
      await dispatch(addSnacksItem({ formData, reset }));
      navigate('/admin/items');
    }
  };
  useEffect(() => {
    if (itemId) {
      dispatch(fetchSnacksItem(itemId));
    }

    return () => {
      dispatch(resetItem());
    };
  }, []);
  useEffect(() => {
    setValue('name', item.name);
    setValue('price', item.price);
    setValue('category', item.category);
    setValue('disable', item.disable || false);
  }, [item]);

  return (
    <>
      <AppBackdrop open={loading} />
      {!loading && (
        <>
          <h2>{itemId ? 'Update' : 'Add'} item</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Item Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register('name', { required: 'This field is required' })}
              />
              <TextField
                fullWidth
                label="Price"
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
                {...register('price', { required: 'This field is required' })}
              />
              <TextField
                fullWidth
                label="Category"
                type="number"
                error={!!errors.category}
                helperText={errors.category?.message}
                {...register('category', {
                  required: 'This field is required'
                })}
              />
              <FormControlLabel
                sx={{ flexDirection: 'row' }}
                control={
                  <Checkbox
                    defaultChecked={item.disable}
                    {...register('disable')}
                    sx={{ pl: 0, py: 0 }}
                  />
                }
                label="Disable"
                labelPlacement="start"
              />
              <Button type="submit">{itemId ? 'Update' : 'Add'}</Button>
              <Button variant="outlined" component={Link} to="/admin/items">
                Go to back
              </Button>
            </Stack>
          </form>
        </>
      )}
    </>
  );
};

export default PutItem;
