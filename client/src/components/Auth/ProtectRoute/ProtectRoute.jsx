import React from 'react';
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';



const ProtectRoute = ({ children }) => {
  const { authenticate, userInfo } = useSelector(state => state.auth);


  if (!authenticate) {
    return <Navigate to="/login" replace />;
  }
  if (userInfo?.role === "admin" || userInfo?.role === "editor") {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
}

export default ProtectRoute;