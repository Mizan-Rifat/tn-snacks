import { configureStore } from '@reduxjs/toolkit';
import snackItemsReducer from './slices/snackItemsSlice';
import snackOrdersReducer from './slices/snackOrdersSlice';
import usersReducer from './slices/usersSlice';

export default configureStore({
  reducer: {
    snackItems: snackItemsReducer,
    snackOrders: snackOrdersReducer,
    users: usersReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
