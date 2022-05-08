import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from 'firebaseApp/firebase';
import { toast } from 'react-toastify';

const snackOrdersRef = collection(db, 'snackOrders');
const completedSnackOrdersRef = collection(db, 'completedSnackOrders');
const getSnackUsersOrderRef = orderId => `/snackOrders/${orderId}/userOrders`;

export const completeSnackOrders = createAsyncThunk(
  'sanck_orders/complete_order',
  async (orders, { getState }) => {
    try {
      orders.forEach(async order => {
        await addDoc(completedSnackOrdersRef, order);
      });
      const docRef = doc(
        db,
        'snackOrders',
        getState().snackOrders.snackOrder.id
      );
      await updateDoc(docRef, { status: false });
    } catch (error) {
      console.log({ error });
    }
  }
);

export const addSnackOrder = createAsyncThunk(
  'sanck_orders/add_user_order',
  async data => {
    try {
      const item = await addDoc(snackOrdersRef, data);
      toast.success('Successfully created.');
      return item;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const addUserSnackOrder = createAsyncThunk(
  'sanck_orders/add_user_order',
  async ({ formData, category }, { getState }) => {
    const snackUsersOrderRef = collection(
      db,
      getSnackUsersOrderRef(getState().snackOrders.snackOrder.id)
    );
    const snackOrderRef = doc(
      db,
      'snackOrders',
      getState().snackOrders.snackOrder.id
    );

    try {
      const item = await addDoc(snackUsersOrderRef, formData);

      await updateDoc(snackOrderRef, {
        categories: arrayUnion(category)
      });
      toast.success('Successfully created.');
      return item;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const updateUserSnackOrder = createAsyncThunk(
  'sanck_orders/update_user_order',
  async ({ id, data }, { getState }) => {
    const docRef = doc(
      db,
      `${getSnackUsersOrderRef(getState().snackOrders.snackOrder.id)}/${id}`
    );
    try {
      const item = await updateDoc(docRef, data);
      return item;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const deleteUserSnackOrder = createAsyncThunk(
  'sanck_orders/delete_user_order',
  async ({ id, itemId }, { getState }) => {
    const snackUsersOrderRef = doc(
      db,
      getSnackUsersOrderRef(getState().snackOrders.snackOrder.id),
      id
    );

    const category = getState().snackItems.items.find(
      item => item.id === itemId
    ).category;

    const snackOrderRef = doc(
      db,
      'snackOrders',
      getState().snackOrders.snackOrder.id
    );

    try {
      const item = await deleteDoc(snackUsersOrderRef);

      const userOrders = getState().snackOrders.userOrders;

      if (!userOrders.some(order => order.category === category)) {
        await updateDoc(snackOrderRef, {
          categories: arrayRemove(category)
        });
      }
      toast.success('Successfully deleted.');
      return item;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const updateSnackOrder = createAsyncThunk(
  'sanck_orders/update_snack_order',
  async ({ id, data }) => {
    const docRef = doc(db, 'snackOrders', id);

    try {
      const item = await updateDoc(docRef, data);
      toast.success('Successfully updated.');
      return item;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const snackOrdersSlice = createSlice({
  name: 'snackOrder',
  initialState: {
    snackOrder: null,
    completedSnackOrders: [],
    currentUserCompletedSnackOrders: [],
    userOrders: [],
    currentUserOrders: [],
    loading: true
  },
  reducers: {
    setLoadingTrue: state => {
      state.loading = true;
    },
    setLoadingFalse: state => {
      state.loading = false;
    },
    snackOrdersFetched: (state, action) => {
      state.snackOrder = action.payload;
      state.loading = false;
    },
    setCompletedSnackOrders: (state, action) => {
      state.completedSnackOrders = action.payload;
      state.loading = false;
    },
    setCurrentUserCompletedSnackOrders: (state, action) => {
      state.currentUserCompletedSnackOrders = action.payload;
      state.loading = false;
    },
    setUserOrders: (state, action) => {
      state.userOrders = action.payload;
      state.loading = false;
    },
    setCurrentUserOrders: (state, action) => {
      state.currentUserOrders = action.payload;
      state.loading = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(deleteUserSnackOrder.pending, state => {
        state.loading = true;
      })
      .addCase(deleteUserSnackOrder.fulfilled, state => {
        state.loading = false;
      });
  }
});

export const {
  setLoadingTrue,
  snackOrdersFetched,
  setUserOrders,
  setCurrentUserOrders,
  setCompletedSnackOrders,
  setCurrentUserCompletedSnackOrders
} = snackOrdersSlice.actions;

export default snackOrdersSlice.reducer;
