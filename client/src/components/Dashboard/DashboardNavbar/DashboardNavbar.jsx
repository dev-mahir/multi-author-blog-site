import React, { useState } from 'react';
import { BsBell, BsListUl } from "react-icons/bs";
import { Link } from "react-router-dom";
import Avatar from '../../Avatar/Avatar';
import UserDropdown from './UserDropdown/UserDropdown';
import Notifications from './Notifications/Notifications';
import UserMessage from './UserMessage/UserMessage';
import { useSelector } from 'react-redux';
import moment from 'moment';


const DashboradNavbar = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [adminToggle, setAdminToggle] = useState(false);


  return (
    <>
      <div className='dashborad-navbar'>

        <div className="dashborad-navbar-left-side">
          <Avatar />
          <label className='bar' htmlFor="sidebar"><span><BsListUl /></span></label>
          <h2><Link to='/dashborad'>{userInfo?.name}</Link></h2>
        </div>
        <div className="dashborad-navbar-right-side">
          <h2><Link to='/'><span>View site</span></Link></h2>
          <div className="search">
            <input type="text" placeholder='search' className="form-control" />
          </div>
          <div className="user">
            <div className="natification-message">
             
              
              <Notifications />
              
              
              {/* <UserMessage /> */}


            </div>
            <div className='user' onClick={() => setAdminToggle(!adminToggle)}>
              <label htmlFor="adminInfo">
                <Avatar />
              </label>
              <div className="name-time">
                <h3>{userInfo?.name}</h3>
                <span>{moment(userInfo?.createdAt).format('ll') }</span>
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