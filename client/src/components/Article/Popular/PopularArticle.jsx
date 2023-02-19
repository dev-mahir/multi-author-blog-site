import React from 'react'
import { Link } from 'react-router-dom'

const PopularArticle = () => {
  return (
    <>
      <div className='row popular-post'>
        <div className="col-4">
          <Link to="/">
            <img src="/images/food.jpg" alt="" />
          </Link>
        </div>
        <div className="col-8">
          <div className="title-time">
            <Link to="/">How was the day in Delhi</Link>
            <span>2 jun 2023</span>
          </div>
        </div>
      </div>  <div className='row popular-post'>
        <div className="col-4">
          <Link to="/">
            <img src="/images/food.jpg" alt="" />
          </Link>
        </div>
        <div className="col-8">
          <div className="title-time">
            <Link to="/">How was the day in Delhi</Link>
            <span>2 jun 2023</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default PopularArticle