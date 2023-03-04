import React, { useEffect, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { get_tag } from '../../redux/tag/action';
import PopularArticle from '../Article/Popular/PopularArticle';
import './_sidebar.scss'

const Sidebar = () => {
  const { category } = useSelector(state => state.cat);
  const { tag } = useSelector(state => state.tag);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');


  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/article/search/${search}`);
  }

  useEffect(() => {
    dispatch(get_tag());
  }, [dispatch]);



  return (
    <div className='sidebar'>
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
          {category.length === 0 && <p>No category found</p>}

          {category && category.map((item, index) =>

            <div key={index} className="cate-item">
              <li><FaChevronRight />
                <Link to={`/article/category/${item.slug}`}>{item.name}</Link>
              </li>
              <span>(45)</span>
            </div>
          )}
        </ul>
      </div>

      <div className="tag">
        <div className="title">
          <h3>Tag</h3>
        </div>

        {category.length === 0 && <p>No category found</p>}
        <ul>
          {tag.length > 0 && tag.map((item, index) =>
            <li key={index}><Link to={`/article/tag/${item.slug}`}>{item.name}</Link></li>
          )}
        </ul>

      </div>


    </div>
  )
}

export default Sidebar