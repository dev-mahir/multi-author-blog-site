import React from 'react';
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';



const ProtectRoute = ({ children }) => {
  const { userInfo } = useSelector(state => state.auth);

  if (userInfo?.role === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}

export default ProtectRoute;

