import React from 'react';
import Helmet from 'react-helmet'
import {  Outlet, Routes } from 'react-router-dom';
import DashboradNavbar from '../DashboardNavbar/DashboardNavbar';
import Sidebar from '../Sidebar/Sidebar';




const Dashborad = () => {
  return (
    <div className='dashborad'>
      <Helmet>
        <title>Dashborad</title>
      </Helmet>
      <DashboradNavbar />
      <div className="dashborad-main-content">

        <Sidebar />

        <Outlet/>
        
      </div>
    </div>
  )
}

export default Dashborad