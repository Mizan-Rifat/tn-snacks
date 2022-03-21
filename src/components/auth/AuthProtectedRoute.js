import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthProtectedRoute = () => {
  const { currentUser } = useSelector(state => state.users);
  return currentUser ? <Outlet /> : <Navigate to="login" />;
};

export default AuthProtectedRoute;
