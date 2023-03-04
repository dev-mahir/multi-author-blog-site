import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { user_logout } from '../../../../redux/auth/action';
import Avatar from '../../../Avatar/Avatar';

const UserDropdown = ({ toggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUserLogout = () => { 
    dispatch(user_logout(navigate))
  }
  
  return (
    <div className={`user_dropdown ${toggle ? "show" : ""}`}>
      <div className="image-email">
        <Avatar />
        <span>Md Mahir</span>
      </div>
      <ul>
        <li><Link to='/dashborad/profile'>Profile</Link></li>
        <li><Link to='/'>view site</Link></li>
        <li><span onClick={handleUserLogout}>Logout</span></li>
      </ul>
    </div>
  )
}

export default UserDropdown;