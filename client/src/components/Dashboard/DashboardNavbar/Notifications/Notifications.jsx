import React, { useState } from 'react'
import { BsBell } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { update_notification } from '../../../../redux/dashboard/action'
import './_notification.scss'

const Notifications = () => {

  const { notification } = useSelector(state => state.dashboard);
  const [notiToggle, setNotiToggle] = useState(false);
  const dispatch = useDispatch();
  const countNoti = notification?.filter(item => item.status !== false)


  return (

    <div className="natification">
      <div onClick={() => setNotiToggle(!notiToggle)}>
        <span><BsBell /></span>
        <div className="nCount">{countNoti.length}</div>
      </div>

      <div className={`natifications ${notiToggle ? "show" : ""}`}>
        <ul>
          {notification.length > 0 && notification.map((item, index) =>
            <li style={{opacity:  item.status === false && ".7"}} onClick={() => dispatch(update_notification(item._id))} className='bg'>
              <Link to={`/artical/details/${item.post_slug}`}>
                <img src={`/images/${item.image}`} alt="" />
                <span><b>{item.name}</b> {item.subject} </span>
              </Link>
              {/* <div className="nDelete"><FaTrash /></div> */}
            </li>
          )
          }
        </ul>
      </div>

    </div>

  )
}

export default Notifications