import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
  const { currentUser } = useSelector(state => state.users);
  return currentUser.role === 'admin' ? <Outlet /> : <Navigate to="/" />;
};

export default AdminProtectedRoute;
