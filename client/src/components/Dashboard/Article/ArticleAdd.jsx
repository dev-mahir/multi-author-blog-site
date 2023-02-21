import React from 'react'
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { BsCardImage } from "react-icons/bs";

const ArticleAdd = () => {

    return (
        <div className='add-article'>

            <Helmet>
                <title>Article add</title>
            </Helmet>
            <div className="add">
                <div className="title-show-article">
                    <h2>Add Article</h2>
                    <Link className='btn' to="/dashborad/all-article">All Article</Link>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Article title</label>
                        <input type="text" name='title' placeholder='article title' className="form-control" id='title' />
                        <p className='error'>title</p>


                    </div>
                    <div className="form-group">
                        <label htmlFor="slug">Article slug</label>
                        <input type="text" placeholder='article slug' className="form-control" name='slug' id='slug' />
                        <p className='error'>slug</p>

                    </div>
                    <button className='btn'>Update</button>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select className='form-control' name="category" id="category">
                            <option value="">--select article category--</option>
                            <option>cat Name</option>


                        </select>
                        <p className='error'>ca</p>

                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <select className='form-control' name="tag" id="tag">
                            <option value="sdas">--select article tag--</option>
                            <option>tag name</option>

                        </select>

                        <p className='error'></p>

                    </div>
                    <div className="form-group img_upload">
                        <div className="upload">
                            <label htmlFor="upload_image"><BsCardImage /></label>
                            <input type="file" id='upload_image' />
                        </div>
                        <label htmlFor="article text">Article text</label>


                        <p className='error'></p>

                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <div className="image-select">
                            <span></span> : <span></span>

                            <label htmlFor="image">Select Image</label>
                            <input type="file" className="form-control" name='image' id='image' />
                        </div>
                        <div className="image">
                            <img src='' alt="" />


                        </div>
                        <p className='error'></p>

                    </div>
                    <div className="form-group">

                        <button className="btn btn-block">
                            <div className="spinner">
                                <div className="spinner1"></div>
                                <div className="spinner2"></div>
                                <div className="spinner3"></div>
                            </div>
                        </button>
                        <button className="btn btn-block">Add Article</button>


                    </div>
                </form>
            </div>
        </div>
    )
}

export default ArticleAdd