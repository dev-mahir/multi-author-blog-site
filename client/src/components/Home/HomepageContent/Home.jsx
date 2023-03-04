import React, { useEffect, useState } from 'react'
import Pagination from '../../Pagination/Pagination'
import Post from '../../Article/Post/Post';
import { useDispatch, useSelector } from 'react-redux'
import { get_article } from '../../../redux/article/action';

const Home = () => {
  const { all_article } = useSelector(state => state.article);
  const { count } = useSelector(state => state.article);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const limit = 6

  useEffect(() => {
    dispatch(get_article(page, limit));
  }, [dispatch, page]);


  return (
    <>
      <Post article={all_article} />
      {all_article.length === 0 && <p>No post found</p>}
      {all_article.length !== 0 && <Pagination page={page} setPage={setPage} limit={limit} count={count} />}
    </>
  )
}

export default Home;