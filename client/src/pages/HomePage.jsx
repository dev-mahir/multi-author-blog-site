import React, { useEffect, useRef, useState } from 'react'
import PopularArticle from '../components/Article/Popular/PopularArticle';
import Navbar from '../components/Navbar/Navbar';
import { FaArrowUp, FaChevronRight } from "react-icons/fa"
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import MainPost from '../components/Article/MainPost/MainPost';
import SingleArticale from '../components/Article/SingleArticle/SingleArticale';
import Footer from '../components/Footer/Footer';
import Pagination from '../components/Pagination/Pagination';

const HomePage = (props) => {
  const [search, setSearch] = useState('');
  const query = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const singlePost = query.slug;


  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  }







  const handleScrollTop = () => {
        window.scrollTo(0, 0);
  }



  return (
    <div className='home'>
      <Navbar/>
      <div className="main-content">
        <div className="container">
          <div className="row">
            <div className="col-8">

              {singlePost && <SingleArticale />}
              {location.pathname === '/' && <MainPost />}

              <Pagination />
            </div>
            <div className="col-4">
              <div className="search">
                <h2>Search</h2>
                <div className="form-group">
                  <input name='search' value={search} onChange={(e) => setSearch(e.target.value)} type="text" className='form-control' placeholder='search' />
                </div>
                <div className="form-group">
                  <button onClick={handleSearch} className='btn btn-block'>Search</button>
                </div>
              </div>
              <div className="popular-article">
                <div className="title">
                  <h3>Popular article</h3>
                </div>

                <PopularArticle />
              </div>

              <div className="flow-facebook">
                <div className="title">
                  <h3>Following Me</h3>
                </div>
                <div className="image">
                  <iframe title='devmahir' src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fdevmahir.bd&tabs=timeline&width=340&height=100&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1056407878230657" width="340" height="130" style={{ border: "none", overflow: "hidden" }} frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe></div>
              </div>

              <div className="category">
                <div className="title">
                  <h3>Category</h3>
                </div>
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

              <div className="tag">
                <div className="title">
                  <h3>Tag</h3>
                </div>

                <ul>
                  <li><Link to="/">Computer</Link></li>
                  <li><Link to="/">Computer</Link></li>
                  <li><Link to="/">Computer</Link></li>
                  <li><Link to="/">Computer</Link></li>
                </ul>

              </div>

            </div>
          </div>
        </div>
      </div>


      <Footer />
      <div id="scroll">
        <button onClick={handleScrollTop} className="scroll-btn">
          <FaArrowUp />
        </button>
      </div>
    </div>
  )
}

export default HomePage;