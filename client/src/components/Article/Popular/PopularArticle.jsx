import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { get_popular_articles } from '../../../redux/article/action';
import { createdTime } from '../../../utilis/time';

const PopularArticle = () => {

  const { popular_article } = useSelector(state => state.article);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_popular_articles());
  }, [dispatch]);
  

  return (
    <>
      {popular_article.length > 0 && popular_article.map((item, index) => 
        <div className='row popular-post'>
          <div className="col-4">
            <Link to={`/article/details/${item.slug}`}>
              <img src={`/images/${item.image}`} alt="" />
            </Link>
          </div>
          <div className="col-8">
            <div className="title-time">
              <Link to={`/article/details/${item.slug}`}>{item.title}</Link>
              <span>{createdTime(item.createdAt)}</span>
            </div>
          </div>
        </div>
      )}



    </>
  )
}

export default PopularArticle