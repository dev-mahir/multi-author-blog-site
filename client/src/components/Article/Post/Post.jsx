import React from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { createdTime } from '../../../utilis/time';

const Post = ({ article }) => {
  
  return (
    <>
      {article.length > 0 && article.map((item, index) =>
        <div key={index} className='main-article'>
          <div className="row">
            <div className="col-4">
              <div className="image">
                <Link to={`/article/details/${item.slug}`}>
                  <img src={`/images/${item.image}`} alt="" />
                </Link>
                <span>{item?.category?.name}</span>
              </div>
            </div>
            <div className="col-8">
              <div className="title">
                <Link to={`/article/details/${item.slug}`}>
                  {item.title}
                </Link>
              </div>
              <div className="name-time">
                <span><Link to="/">{item.admin_name}</Link></span>
                <span> {createdTime(item.createdAt)}</span>
              </div>
              <div className="description">
                  {ReactHtmlParser(item.description)} 
              </div>
              <div className="read-more">
                <button className='btn'><Link  to={`/article/details/${item.slug}`}>Read more</Link></button>
              </div>
            </div>
          </div>
        </div>
      )}
  
    </>

  )
}

export default Post;