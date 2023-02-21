import React from 'react';
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';



const ProtectRoute = ({ children }) => {
  const { authenticate } = useSelector(state => state.auth);

  if (!authenticate) {
    return <Navigate to="/admin/login" replace />;
  }
  return children ? children : <Outlet />;
}

export default ProtectRoute;