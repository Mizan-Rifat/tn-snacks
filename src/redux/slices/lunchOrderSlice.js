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

const lunchOrdersRef = collection(db, 'lunchOrders');
const completedLunchOrdersRef = collection(db, 'completedLunchOrders');

export const addLunchOrder = createAsyncThunk(
  'lunch_orders/add_user_order',
  async data => {
    try {
      const item = await addDoc(lunchOrdersRef, data);
      toast.success('Successfully created.');
      return item;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const updateLunchOrder = createAsyncThunk(
  'lunch_orders/update_lunch_order',
  async ({ id, data }) => {
    const docRef = doc(db, 'lunchOrders', id);

    try {
      const item = await updateDoc(docRef, data);
      toast.success('Successfully updated.');
      return item;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const addUserLunchOrder = createAsyncThunk(
  'lunch_orders/add_user_order',
  async ({ id, userId, add }) => {
    const docRef = doc(db, 'lunchOrders', id);

    try {
      let item = null;
      if (add) {
        item = await updateDoc(docRef, {
          users: arrayUnion(userId)
        });
      } else {
        item = await updateDoc(docRef, {
          users: arrayRemove(userId)
        });
      }
      toast.success('Successfully updated.');
      return item;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const completeLunchOrders = createAsyncThunk(
  'lunch_orders/complete_order',
  async (orders, { getState }) => {
    try {
      orders.forEach(async order => {
        await addDoc(completedLunchOrdersRef, order);
      });
      const docRef = doc(
        db,
        'lunchOrders',
        getState().lunchOrders.lunchOrder.id
      );
      await updateDoc(docRef, { status: false, open: false });
    } catch (error) {
      console.log({ error });
    }
  }
);

export const deleteCompleteLunchOrders = createAsyncThunk(
  'lunch_items/delete_completed_item',
  async items => {
    try {
      items.forEach(async item => {
        const docRef = doc(db, 'completedLunchOrders', item);
        await deleteDoc(docRef);
      });
      toast.success('Successfully deleted');
    } catch (error) {
      console.log({ error });
    }
  }
);

//-----------------

export const lunchOrdersSlice = createSlice({
  name: 'lunchOrder',
  initialState: {
    lunchOrder: null,
    completedLunchOrders: [],
    currentUserCompletedLunchOrders: [],
    userOrders: [],
    currentUserOrders: [],
    loading: true
  },
  reducers: {
    setLunchOrderState: (state, { payload }) => {
      Object.keys(payload).forEach(item => {
        state[item] = payload[item];
      });
    },
    setLoadingTrue: state => {
      state.loading = true;
    },
    setLoadingFalse: state => {
      state.loading = false;
    },
    lunchOrdersFetched: (state, action) => {
      state.lunchOrder = action.payload;
      state.loading = false;
    },
    setCompletedLunchOrders: (state, action) => {
      state.completedLunchOrders = action.payload;
      state.loading = false;
    },
    setCurrentUserCompletedLunchOrders: (state, action) => {
      state.currentUserCompletedLunchOrders = action.payload;
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
  }
});

export const {
  setLunchOrderState,
  setLoadingTrue,
  lunchOrdersFetched,
  setUserOrders,
  setCurrentUserOrders,
  setCompletedLunchOrders,
  setCurrentUserCompletedLunchOrders
} = lunchOrdersSlice.actions;

export default lunchOrdersSlice.reducer;
