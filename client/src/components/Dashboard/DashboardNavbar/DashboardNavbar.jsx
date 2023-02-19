import React from 'react';
import { BsBell, BsListUl } from "react-icons/bs";
import { FaTrash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import AdminInfo from '../Admin/Admin';
import UserMessage from '../UserMessage/UserMessage';


const DashboradNavbar = () => {

  return (
    <>
      <div className='dashborad-navbar'>

        <div className="dashborad-navbar-left-side">
          <label htmlFor="" className='dash'><span>D</span></label>
          <label className='bar' htmlFor="sidebar"><span><BsListUl /></span></label>
          <h2><Link to='/dashborad'>Sheikh Farid</Link></h2>
        </div>
        <div className="dashborad-navbar-right-side">
          <h2><Link to='/dashborad'><span>View site</span></Link></h2>
          <div className="search">
            <input type="text" placeholder='search' className="form-control" />
          </div>
          <div className="user">
            <div className="natification-message">
              <div className="natification">
                <div>
                  <span><BsBell /></span>
                  <div className="nCount">12</div>
                </div>
                <div className='natifications '>
                  <ul>
                    <li className='bg'>
                      <Link to={`/artical/details/ll`}>Subject</Link>
                      <div className="nDelete"><FaTrash /></div>
                    </li>
                  </ul>
                </div>
              </div>
              <UserMessage />
            </div>
            <label htmlFor="adminInfo"><img src='' alt="" /></label>
            <div className="name-time">
              <h3>Md Mahir</h3>
              <span>215 jun</span>
            </div>
          </div>
        </div>
      </div>
      <AdminInfo />
    </>
  )
}

export default DashboradNavbar