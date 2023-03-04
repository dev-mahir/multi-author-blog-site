import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Avatar = () => {
  const { userInfo } = useSelector(state => state.auth);

  

  return (
    <img className='avatar' src={userInfo?.image ? `/images/${userInfo?.image}` :  "/images/avatar.png"} alt="" />
  )
}

export default Avatar;