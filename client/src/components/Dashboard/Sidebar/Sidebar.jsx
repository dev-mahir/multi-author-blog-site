import React from 'react'
import { Link } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { RiArticleLine } from "react-icons/ri";
import { FaEye, FaRegCaretSquareRight, FaTag } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { BsChevronRight } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className='dashborad-main-content-sidebar'>
      <ul>
        <input type="checkbox" id='article' />
        <input type="checkbox" id='category' />
        <input type="checkbox" id='tag' />
        <input type="checkbox" id='user' />
        <li>
          <Link to='/dashboard'>
            <label>
              <h3>
                <span><AiFillDashboard /></span>
                <span>Dashborad</span>
              </h3>
            </label>
          </Link>
        </li>

        <li>
          <Link to='/dashboard/all-article'>
            <label>
              <h3>
                <span><RiArticleLine /></span>
                <span>Article</span>
              </h3>
            </label>
          </Link>
        </li>
     

        <li>
          <Link to='/dashboard/all-category'>
            <label>
              <h3>
                <span><FaRegCaretSquareRight /></span>
                <span>Category</span>
              </h3>
            </label>
          </Link>
        </li>
        <li>
          <Link to='/dashboard/tag'>
            <label>
              <h3>
                <span><FaTag /></span>
                <span>Tag</span>
              </h3>
            </label>
          </Link>
        </li>
        <li>
          <Link to='/dashboard/users'>
            <label>
              <h3>
                <span><HiUserGroup /></span>
                <span>User</span>
              </h3>
            </label>
          </Link>
        </li>

      
        

      </ul>
    </div>
  )
}

export default Sidebar;