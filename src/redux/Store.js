import { configureStore } from '@reduxjs/toolkit';
import snackItemsReducer from './slices/snackItemsSlice';
import snackOrdersReducer from './slices/snackOrdersSlice';
import lunchOrdersReducer from './slices/lunchOrderSlice';
import usersReducer from './slices/usersSlice';

export default configureStore({
  reducer: {
    snackItems: snackItemsReducer,
    snackOrders: snackOrdersReducer,
    lunchOrders: lunchOrdersReducer,
    users: usersReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
