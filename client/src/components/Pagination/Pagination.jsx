import React from 'react'
import { Link } from 'react-router-dom';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'

const Pagination = () => {
  return (
    <div className='pagination'>
      <ul>
        <li><Link to="/"><BsChevronDoubleLeft /></Link></li>
        <button className='btn' disabled> <span><BsChevronDoubleLeft /> </span></button>
        <li className='active'><Link to="/">1</Link></li>
        <li><Link to="/">2</Link></li>
        <li><Link to="/">3</Link></li>
        <button className='btn' disabled> <span><BsChevronDoubleLeft /> </span></button>
        <li><Link to="/"><BsChevronDoubleRight /></Link></li>

      </ul>

    </div>
  )
}

export default Pagination