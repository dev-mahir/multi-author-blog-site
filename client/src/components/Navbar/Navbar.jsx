import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import Avatar from '../Avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { user_logout } from '../../redux/auth/action';



const Navbar = () => {
  const { authenticate , userInfo} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleUserLogOut = () => { 
    dispatch(user_logout())
  }


  return (
    <header className='navbar'>
      <div className="container">
        <div className="row">
          <input type="checkbox" id="toggle" />
          <div className="col-4 logo" >
            <Link to="/" >
              <img src="/images/myBlog.png" alt="" />
            </Link>
            <label className='menu_icon' htmlFor='toggle'><AiOutlineUnorderedList /></label>
          </div>
          <div className="col-8">
            <ul className="menu active">
              {userInfo?.role === "admin" && <li className='link-item'>
                <Link to="/dashboard">Dashboard</Link>
              </li>}
              <li className='link-item'>
                <Link to="/home">Home</Link>
              </li>
              <li className='link-item'>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <div className="user" onClick={handleUserLogOut}>
                  {authenticate && <Avatar />}    <Link to="/login">{authenticate ? "Logout" : "Login"}</Link>
                </div>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </header>
  )
}



export default Navbar;