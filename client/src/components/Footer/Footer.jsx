import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { get_old_article } from '../../redux/article/action';
import { createdTime } from '../../utilis/time';

const Footer = () => {
  const { all_article } = useSelector(state => state.article);
  const dispatch = useDispatch();

  const recentArticle = all_article.slice(0, 3);

  useEffect(() => {
    dispatch(get_old_article());
  }, [dispatch]);

  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="title">
              <h2>Recent Article</h2>
            </div>
            <div className="some-recent-article">
              {all_article.length === 0 && <p>No post found</p>}

              {recentArticle.length > 0 && recentArticle.map((item, index) =>
                <div key={index} className="row">
                  <div className="col-4">
                    <div className="img">
                      <Link to={`/article/details/${item.slug}`}>
                        <img src={`/images/${item.image}`} alt="" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-8">
                    
                    <div className="title-link">
                      <Link to={`/article/details/${item.slug}`}>{item.title}</Link>
                      <br />
                      <span>{createdTime(item.createdAt)}</span>
                    </div>

                  </div>
                </div>
              )}
            </div>

          </div>

          <div className="col-4">
            <div className="title cat">
              <h2>Category</h2>
            </div>
            <div className="category">

              <ul className="cate-list">
                <div className="cate-item">
                  <li><FaChevronRight />
                    <Link to="/">Algorithom</Link>
                  </li>
                  <span>(45)</span>
                </div>
                <div className="cate-item">
                  <li><FaChevronRight />
                    <Link to="/">Algorithom</Link>
                  </li>
                  <span>(45)</span>
                </div>
                <div className="cate-item">
                  <li><FaChevronRight />
                    <Link to="/">Algorithom</Link>
                  </li>
                  <span>(45)</span>
                </div>
              </ul>
            </div>
          </div>

          <div className="col-4">
            <div className="title">
              <h2>Feature post</h2>
            </div>
            <div className="some-recent-article">
              <div className="row">
                <div className="col-4">
                  <div className="img">
                    <Link to="/">
                      <img src="/images/food.jpg" alt="" />
                    </Link>
                  </div>
                </div>
                <div className="col-8">
                  <div className="title-link">
                    <Link to="/">Lorem ipsum dolor sit amet.</Link>
                    <br />
                    <span>2 jun 2020</span>
                  </div>


                </div>
              </div>
            </div>

          </div>
        </div>      <div className="copyright">
          <div className="text">
            <p>Created by <Link to="/">Md Mahir</Link></p>
          </div>
          <div className="terms">
            <Link to="/">Terms and Condition</Link>
            <Link to="/">Privacy Policy</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer;
