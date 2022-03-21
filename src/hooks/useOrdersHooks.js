import { useEffect } from 'react';
import { useConfirmation } from 'providers/ConfirmationProvider';
import { db } from 'firebaseApp/firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
  itemsfetched,
  setSnacksItemsLoadingTrue
} from 'redux/slices/snackItemsSlice';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { getFsData } from 'utils';
import {
  snackOrdersFetched,
  setUserOrders,
  deleteUserSnackOrder,
  setCurrentUserOrders
} from 'redux/slices/snackOrdersSlice';
import { usersfetched } from 'redux/slices/usersSlice';

const getTotalPrice = items =>
  items.reduce((acc, val) => acc + Number(val.qty * val.price), 0);

const useOrdersHook = () => {
  const itemsRef = collection(db, 'snackItems');
  const snackOrdersRef = collection(db, 'snackOrders');
  const usersRef = collection(db, 'users');

  const confirm = useConfirmation();

  const { items } = useSelector(state => state.snackItems);
  const { users, currentUser } = useSelector(state => state.users);

  const dispatch = useDispatch();

  const handleDeleteOrder = async id => {
    try {
      await confirm({
        variant: 'error',
        description: 'Are you sure you want to cancel this order?'
      });
      dispatch(deleteUserSnackOrder(id));
    } catch (error) {
      console.log('no');
    }
  };

  useEffect(async () => {
    const snackOrderQ = query(snackOrdersRef, where('status', '==', true));

    onSnapshot(snackOrderQ, snapshot => {
      const orders = snapshot.docs.map(doc => getFsData(doc));

      dispatch(snackOrdersFetched(orders[0]));

      if (orders.length > 0) {
        const userOrdersRef = collection(
          db,
          `/snackOrders/${orders[0].id}/userOrders`
        );
        onSnapshot(userOrdersRef, snapshot => {
          const uOrders = snapshot.docs.map(doc => getFsData(doc));

          const orderItems = uOrders.map(order => ({
            user: users.find(user => user.id === order.uid)?.name,
            ...items.find(item => item.id === order.itemId),

            ...order
          }));
          const currentUserOrders = orderItems.filter(
            item => item.uid === currentUser.id
          );
          dispatch(setUserOrders(orderItems));
          dispatch(setCurrentUserOrders(currentUserOrders));
        });
      }
    });

    if (!items.length) {
      dispatch(setSnacksItemsLoadingTrue());
      onSnapshot(itemsRef, snapshot => {
        const items = snapshot.docs.map(doc => getFsData(doc));
        dispatch(itemsfetched(items));
      });
    }

    if (!users.length) {
      onSnapshot(usersRef, snapshot => {
        const users = snapshot.docs.map(doc => getFsData(doc));
        dispatch(usersfetched(users));
      });
    }
  }, [items, users]);

  return {
    getTotalPrice,
    handleDeleteOrder
  };
};

export default useOrdersHook;
