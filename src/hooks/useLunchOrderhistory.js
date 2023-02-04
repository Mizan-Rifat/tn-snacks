import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'firebaseApp/firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLunchOrderState } from 'redux/slices/lunchOrderSlice';
import { getFsData } from 'utils';

const useLunchOrderhistory = () => {
  const completedLunchOrdersRef = collection(db, 'completedLunchOrders');
  const q = query(completedLunchOrdersRef, orderBy('date'));

  const dispatch = useDispatch();
  useEffect(async () => {
    onSnapshot(q, snapshot => {
      const orders = snapshot.docs.map(doc => {
        return {
          ...getFsData(doc)
        };
      });
      dispatch(
        setLunchOrderState({
          completedLunchOrders: orders
        })
      );
    });
  }, []);
};

export default useLunchOrderhistory;
