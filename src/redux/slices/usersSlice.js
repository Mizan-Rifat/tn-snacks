import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { db } from 'firebaseApp/firebase';
import { getFsData } from 'utils';
import { toast } from 'react-toastify';

const usersRef = collection(db, 'users');

export const fetchUser = createAsyncThunk('users/fetch_user', async id => {
  const q = query(usersRef, where('uid', '==', id));
  try {
    const users = await getDocs(q);
    const user = getFsData(users.docs[0]);
    return user;
  } catch (error) {
    console.log({ error });
  }
});

export const updateUserDeposit = createAsyncThunk(
  'users/update_user_deposit',
  async ({ userId, deposit }) => {
    const docRef = doc(db, 'users', userId);
    try {
      const item = await updateDoc(docRef, { deposit });
      toast.success('Successfully updated.');
      return item;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const usersSlice = createSlice({
  name: 'snackItems',
  initialState: {
    users: [],
    currentUser: {},
    loading: true
  },
  reducers: {
    setLoadingTrue: state => {
      state.loading = true;
    },
    setLoadingFalse: state => {
      state.loading = false;
    },
    setFetchingFalse: state => {
      state.fetching = false;
    },
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
      state.loading = false;
    },
    usersfetched: (state, action) => {
      state.users = action.payload;
      state.fetching = false;
      state.loading = false;
    }
  }
});

export const { setLoadingTrue, usersfetched, setCurrentUser } =
  usersSlice.actions;

export default usersSlice.reducer;
