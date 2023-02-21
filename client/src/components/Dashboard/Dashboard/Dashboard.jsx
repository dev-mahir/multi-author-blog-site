import React from 'react';
import Helmet from 'react-helmet'
import { Outlet } from 'react-router-dom';
import DashboradNavbar from '../DashboardNavbar/DashboardNavbar';
import Sidebar from '../Sidebar/Sidebar';



const Dashborad = () => {
  return (
    <div className='dashboard'>
      <Helmet>
        <title>Dashborad</title>
      </Helmet>
      <DashboradNavbar />
      <div className="dashborad-main-content">
        <Sidebar />
        <div className='content'>
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default Dashborad