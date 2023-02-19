import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUnorderedList } from 'react-icons/ai';


const Navbar = () => {
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
              <li className='link-item'>
                <Link to="/home">Home</Link>
              </li>
              <li className='link-item'>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;