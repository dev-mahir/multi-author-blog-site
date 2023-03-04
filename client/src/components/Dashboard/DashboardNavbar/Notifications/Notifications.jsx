import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Notifications = ({ toggle }) => {


  return (
    <div className={`natifications ${toggle ? "show" : ""}`}>
      <ul>
        <li className='bg'>
          <Link to={`/artical/details/ll`}>Subject</Link>
          <div className="nDelete"><FaTrash /></div>
        </li>
      </ul>
    </div>
  )
}

export default Notifications