import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import { AiFillTag, AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaFacebookSquare, FaTwitterSquare, FaGithubSquare } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import Comments from './Comments/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { get_category_article, get_single_article, like_dislike } from '../../../redux/article/action';
import ReactHtmlParser from 'react-html-parser';
import { createdTime } from '../../../utilis/time';
import SocailShare from './SocailShare/SocailShare';
import Login from '../../Auth/Login/Login';
import CircleLoader from '../../Loader/CircleLoader';





const SingleArticale = () => {
  const { userInfo } = useSelector(state => state.auth);
  const { single_article } = useSelector(state => state.article);
  const { cat_article } = useSelector(state => state.article);
  const [loginModal, setloginModal] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate()

  const slug = params.slug;
  const cat_slug = single_article?.category?.slug;
  const relatedArticle = cat_article.slice(0, 3).filter(item => item._id !== single_article._id);


  const handleLike = () => {
    if (!userInfo) {
      setloginModal(true);
      navigate('/login');
    } else {
      dispatch(like_dislike(single_article._id, "like", { userId: userInfo?._id }))
    }
  }

  const handledislike = () => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(like_dislike(single_article._id, "dislike", { userId: userInfo?._id }))
    }
  }


  useEffect(() => {
    if (slug) {
      dispatch(get_single_article(slug));
    }
    if (cat_slug) {
      dispatch(get_category_article(cat_slug))
    }
  }, [slug, cat_slug, dispatch]);



  return (
    <>
      
     
      {(Object.keys(single_article).length > 0) &&

        <div className="article-details">
                <div className="path">
            <Link to='/'>Home</Link>
            <span className='arrow'><BsChevronRight /></span>
            <Link to={`/article/category/${single_article?.category?.slug}`}>{single_article?.category?.name}</Link>
          </div>
          <div className="title">
            <h3>{single_article.title}</h3>
          </div>
          <div className="auth-time">
            <div className="auth">
              <h4><AiFillTag /></h4>
              <span><Link to={`/article/tag/${single_article?.tag?.slug}`}>{single_article?.tag?.name}</Link></span>
            </div>
            <div className="time">
              <span>{createdTime(single_article.createdAt)}</span>
            </div>
          </div>
          <div className="home-artical-image">
            <img src={`/images/${single_article.image}`} alt="" />
          </div>
          <div className="home-artical-text">
            <p>{ReactHtmlParser(single_article.description)}</p>
          </div>
          <div className="like-dislike-view">
            <div className="like-dislike">
              <div onClick={handleLike} className="like">
                <button disabled className='icon'><AiFillLike /></button>
                <div className="dislike-number">{single_article.like}</div>
              </div>
              <div onClick={handledislike} className="dislike">
                <button disabled className='icon'><AiFillDislike /></button>
                <div className="like-number">{single_article.dislike}</div>
              </div>
            </div>
            <div className="view">
              <span>{single_article.views}</span>
              <span>views</span>
            </div>
          </div>



          <div className="more-tags">
            <span>Tags</span>
            <Link to={`/artical/tag/${single_article?.tag?.slug}`}>{single_article?.tag?.name}</Link>

          </div>

          <SocailShare />


          {relatedArticle.length > 0 &&
            <div className="related-article">
              <div className="more">
                <h3>Related Articles</h3>
              </div>
              <div className="articles">
                {relatedArticle.map((item, index) => {
                  return <Link key={index} to={`/artical/details/${item.slug}`} className='article'>
                    <img src={`/images/${item.image}`} alt="" />
                    <span className='line-clamp-3'>{item.title}</span>
                  </Link>
                })}
              </div>
            </div>
          }





          <Comments single_article={single_article} />
        </div>}
    </>



  )

};






export default SingleArticale;