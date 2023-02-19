import React from 'react';
import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import { AiFillTag, AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaFacebookSquare, FaTwitterSquare, FaGithubSquare } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import Comments from '../Comments/Comments';



const SingleArticale = () => {


  return (
    <div className="article-details">
      <div className="path">
        <Link to='/'>Home</Link>
        <span className='arrow'><BsChevronRight /></span>
        <Link to={`/artical/category/fkgkgk`}>cat</Link>
        <span className='arrow'><BsChevronRight /></span>
        <span>125</span>
      </div>
      <div className="title">
        <h3><Link to="#">title</Link></h3>
      </div>
      <div className="auth-time">
        <div className="auth">
          <h4><AiFillTag /></h4>
          <span><Link to={`/artical/tag/li`}>tag</Link></span>
        </div>
        <div className="time">
          <span>2 jun 2020</span>
        </div>
      </div>
      <div className="home-artical-image">
        <img src="" alt="" />
      </div>
      <div className="home-artical-text">
        <p>desc</p>
      </div>
      <div className="like-dislike-view">
        <div className="like-dislike">
          <div className="dislike">
            <button ><AiFillDislike /></button> : <button disabled className='icon'><AiFillDislike /></button>

            <div className="like-number">disli</div>
          </div>
          <div className="like">

            <button disabled className='icon'><AiFillLike /></button>

            <div className="dislike-number">lieke</div>
          </div>
        </div>
        <div className="view">
          <span>211</span>
          <span>view</span>
        </div>
      </div>
      <div className="read-more">
        <span>Read more : </span>
        <Link to='/'>Redmore</Link>
      </div>
      <div className="more-tags">
        <span>Tags</span>

        <Link to={`/artical/tag/tag`}>tag</Link>

      </div>
      <div className="social-icons">
        <a className='l1' href=""><FaFacebookSquare /></a>
        <a className='l2' href=""><FaTwitterSquare /></a>
        <a className='l3' href=""><FaGithubSquare /></a>
        <a className='l4' href=""><ImLinkedin /></a>
      </div>
      <div className="related-article">
        <div className="more">
          <h3>Related Articles</h3>
        </div>
        <div className="articles">

          <Link to={`/artical/details/ggg`} className='article'>
            <img src="dd" alt="" />
            <span>very popular during the Renaissance. The first line of</span>
          </Link>
          <span>Related article not found</span>

        </div>
      </div>
      <div className="comment_title">
        <h3>Article comments</h3>
      </div>
      <Comments />
    </div>
  )
};






export default SingleArticale;