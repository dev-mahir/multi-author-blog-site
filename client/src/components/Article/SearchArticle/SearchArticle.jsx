import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { get_category_article, get_search_article, get_tag_article } from '../../../redux/article/action';
import Post from '../Post/Post'

const SearchArticle = () => {
  const { cat_article, tag_article, search_article } = useSelector(state => state.article);
  const { pathname } = useLocation();
  const { type, searchValue } = useParams();
  const dispatch = useDispatch();



  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, searchValue]);

  console.log(search_article);


  useEffect(() => {
    if (type === "category") {
      dispatch(get_category_article(searchValue));
    }
    if (type === "tag") {
      dispatch(get_tag_article(searchValue));
    }
    if (type === "search") {
      dispatch(get_search_article(searchValue));
    }
  }, [searchValue, dispatch, type]);





  return (
    <>
      {type === "category" && cat_article.length > 0 && <Post article={cat_article} />}
      {type === "tag" && tag_article.length > 0 && <Post article={tag_article} />}
      {type === "search" && search_article.length > 0 && <Post article={search_article} />}


      {(!cat_article.length > 0 && !tag_article.length > 0 && !search_article.length > 0) && <p>No post found</p>}



    </>

  )
}

export default SearchArticle;