import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { FaRegEye, FaSearch } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { delete_article, get_users_article } from '../../../redux/article/action';
import DeleteModal from '../../Modal/DeleteModal/DeleteModal';

const DashboardArticle = () => {

    const { users_article } = useSelector(state => state.article);
    const [show, setShow] = useState(false);
    const [articleId, setArticleId] = useState('');
    const dispatch = useDispatch();


    const handleDeleteModalShow = (id) => {
        setArticleId(id);
        setShow(true);
    }
    const handletagDelete = () => {
        dispatch(delete_article(articleId, setShow));
    }


    useEffect(() => {
        dispatch(get_users_article());
    }, [dispatch]);


    return (
        <div className='dashborad-article'>




            <Helmet>
                <title>All Article</title>
            </Helmet>
            <div className="article-action-pagination">
                <div className="numof-search-newAdd">
                    <div className="numof">
                        <h2>Article   {users_article.length > 0 ? `(${users_article.length})` : ""} </h2>
                    </div>
                    <div className="searchOf">
                        <div className="search">
                            <input type="text" placeholder='search article' className="form-control" />
                        </div>
                        <span><FaSearch /></span>
                    </div>
                    <div className="newAdd">
                        <Link className='btn' to='/dashboard/article-add'>Add New</Link>
                    </div>
                </div>



                <div className="height-70vh">
                    <div className="articles">


                        
                        {show && <DeleteModal
                            title="Delete tag"
                            description="Are you sure to want delete tag?"
                            close={setShow}
                            handleDelete={handletagDelete}
                        />}


                        {users_article.length > 0 &&
                            users_article.map((item, index) =>
                                <div  key={index} className="article">
                                    <img src={`/images/${item.image}`} alt="" />
                                    <Link className='line-clamp-1' to={`/${item.slug}`}>{item.title}</Link>
                                    <p></p>
                                    <div className="action">
                                        <span>
                                            <Link to={`/dashboard/edit-article/${item.slug}`}><MdEdit /></Link>
                                        </span>
                                        <span>
                                            <Link to="/"><FaRegEye /></Link>
                                        </span>
                                        <span onClick={() => handleDeleteModalShow(item._id)}><MdDelete /></span>
                                    </div>
                                </div>
                            )
                        }

                        {users_article.length === 0 && <p>No post found</p>}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardArticle;