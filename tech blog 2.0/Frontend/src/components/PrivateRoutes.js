import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function PrivateRoute({ component }) {
  const { user } = useAuth();

  return user ? component : <Navigate to="/login" />;
}

export default PrivateRoute;
