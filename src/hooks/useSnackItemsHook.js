import { useEffect } from 'react';
import { db } from 'firebaseApp/firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
  itemsfetched,
  setSnacksItemsLoadingTrue
} from 'redux/slices/snackItemsSlice';
import { collection, onSnapshot } from 'firebase/firestore';
import { getFsData } from 'utils';

const useSnackItemsHook = () => {
  const itemsRef = collection(db, 'snackItems');

  const { items } = useSelector(state => state.snackItems);

  const dispatch = useDispatch();

  useEffect(async () => {
    if (!items.length) {
      dispatch(setSnacksItemsLoadingTrue());
      onSnapshot(itemsRef, snapshot => {
        const items = snapshot.docs.map(doc => getFsData(doc));
        dispatch(itemsfetched(items));
      });
    }
  }, []);
};

export default useSnackItemsHook;
