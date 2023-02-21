import React, { useState } from 'react';
import { BsBell, BsListUl } from "react-icons/bs";
import { FaTrash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import Avatar from '../../Avatar/Avatar';
import UserDropdown from './UserDropdown/UserDropdown';
import Notifications from './Notifications/Notifications';
import UserMessage from './UserMessage/UserMessage';


const DashboradNavbar = () => {
  const [notiToggle, setNotiToggle] = useState(false);
  const [adminToggle, setAdminToggle] = useState(false);


  return (
    <>
      <div className='dashborad-navbar'>

        <div className="dashborad-navbar-left-side">
          <Avatar />
          <label className='bar' htmlFor="sidebar"><span><BsListUl /></span></label>
          <h2><Link to='/dashborad'>Md  Mahir</Link></h2>
        </div>
        <div className="dashborad-navbar-right-side">
          <h2><Link to='/dashborad'><span>View site</span></Link></h2>
          <div className="search">
            <input type="text" placeholder='search' className="form-control" />
          </div>
          <div className="user">
            <div className="natification-message">
              <div className="natification">
                <div onClick={() => setNotiToggle(!notiToggle)}>
                  <span><BsBell /></span>
                  <div className="nCount">12</div>
                </div>

                <Notifications toggle={notiToggle} />

              </div>
              <UserMessage />
            </div>
            <div className='user' onClick={() => setAdminToggle(!adminToggle)}>
              <label htmlFor="adminInfo">
                <Avatar />
              </label>
              <div className="name-time">
                <h3>Md Mahir</h3>
                <span>215 jun</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      <UserDropdown toggle={adminToggle} />
    </>
  )
}

export default DashboradNavbar