import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="title">
              <h2>Old Article</h2>
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
