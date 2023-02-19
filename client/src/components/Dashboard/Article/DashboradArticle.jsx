import React from 'react';
import Helmet from 'react-helmet';
import { FaRegEye, FaSearch } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";



const DashboradArticle = () => {

    return (
        <div className='dashborad-article'>
            <Helmet>
                <title>All Article</title>
            </Helmet>

            <div className="article-action-pagination">
                <div className="numof-search-newAdd">
                    <div className="numof">
                        <h2>Article (22)</h2>
                    </div>
                    <div className="searchOf">
                        <div className="search">
                            <input type="text" placeholder='search article' className="form-control" />
                        </div>
                        <span><FaSearch /></span>
                    </div>
                    <div className="newAdd">
                        <Link className='btn' to='/dashborad/article-add'>Add New</Link>
                    </div>
                </div>
                <div className="height-70vh">
                    <div className="articles">
                       
                                <div className="article">
                                    <img src='' alt="" />
                                    <Link to={`/artical/details/fff`}>link</Link>
                                    <p></p>
                                    <div className="action">
                                        <span>
                                            <Link to='/dashborad/article/edit'><MdEdit /></Link>
                                        </span>
                                        <span>
                                            <Link><FaRegEye /></Link>
                                        </span>
                                        <span><MdDelete /></span>
                                    </div>
                                </div>
                             'Article not found...'
                    
                    </div>
                </div>
        

            </div>
        </div>
    )
}

export default DashboradArticle