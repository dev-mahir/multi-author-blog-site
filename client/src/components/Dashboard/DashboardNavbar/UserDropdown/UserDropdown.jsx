import React from 'react'
import { Link } from "react-router-dom";
import Avatar from '../../../Avatar/Avatar';

const UserDropdown = ({ toggle }) => {
  return (
    <div className={`user_dropdown ${toggle ? "show" : ""}`}>
      <div className="image-email">
        <Avatar />
        <span>Md Mahir</span>
      </div>
      <ul>
        <li><Link to='/dashborad/profile'>Profile</Link></li>
        <li><Link to='/'>view site</Link></li>
        <li><span>Logout</span></li>
      </ul>
    </div>
  )
}

export default UserDropdown;