import React from 'react'
import { Link } from 'react-router-dom'

const MainPost = () => {
  return (
    <div className='main-article'>
      <div className="row">
        <div className="col-4">
          <div className="image">
            <Link to="/">
              <img src="http://localhost:3000/images/food.jpg" alt="" />
            </Link>
            <span>Algorithom</span>
        </div>
        </div>
        <div className="col-8">
          <div className="title">
            <Link to="/">
              What are you doing for your livelihood.
            </Link>
          </div>
          <div className="name-time">
            <span><Link to="/">Md Mahir</Link></span>
            <span>2 jun 2023</span>
          </div>
          <div className="description">
            <p>  essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
          <div className="read-more">
              <Link to="/article/details/me">Read more</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPost;