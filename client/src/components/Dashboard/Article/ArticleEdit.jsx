import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { BsCardImage } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { get_cat } from '../../../redux/category/action'
import { get_tag } from '../../../redux/tag/action';
import Editor from './Editor/Editor';
import { add_article, edit_article, get_single_article } from '../../../redux/article/action';
import { slugGenerator } from '../../../utilis/slugGenerator';
import Spinner from '../../Loader/Spinner/Spinner';





const ArticleEdit = () => {
    const { tag } = useSelector(state => state.tag);
    const { category } = useSelector(state => state.cat);
    const { spinner } = useSelector(state => state.loader);
    const { single_article } = useSelector(state => state.article);
    const { slug } = useParams();
    const dispatch = useDispatch();
    const get_article_dispatch = useDispatch();

    const [imagePrev, setImagePrev] = useState("");
    const [text, setText] = useState("");


    const [input, setInput] = useState({
        title: "",
        tag: "",
        category: "",
        slug: "",
        image: "",
    })



    const handleInputChange = (e) => {

        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));

    }
    const handleSlug = () => {
        setInput((prevState) => ({
            ...prevState,
            slug: slugGenerator(input.title)
        }));
    }

    const handleImage = (e) => {
        setInput((prevState) => ({
            ...prevState,
            image: e.target.files[0]
        }));
        setImagePrev(URL.createObjectURL(e.target.files[0]));
    }


    const handleEditArticle = (e) => {
        e.preventDefault();
        if (!input.title) {
            alert("all")
        } else {
            const formData = new FormData();
            formData.append("title", input.title);
            formData.append("slug", input.slug);
            formData.append("category", input.category);
            formData.append("tag", input.tag);
            formData.append("image", input.image);
            formData.append("description", text);

            dispatch(edit_article(single_article._id,formData, setInput, setText, setImagePrev, e));
        }
    }

    useEffect(() => {
        dispatch(get_cat());
        dispatch(get_tag());
        dispatch(get_single_article(slug));
    }, [dispatch, slug]);

    useEffect(() => {
        setInput(() => ({
            title: single_article.title,
            tag: single_article.tag,
            category: single_article.category,
            slug: single_article.slug,
            image: single_article.image,
        }))
        setText(single_article.description);
        setImagePrev(`/images/${single_article.image}`)
    }, [single_article])


  

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
                <form onSubmit={handleEditArticle}>
                    <div className="form-group">
                        <label htmlFor="title">Article title</label>
                        <input type="text" name='title' onBlur={handleSlug} value={input.title} onChange={handleInputChange} placeholder='article title' className="form-control" id='title' />

                    </div>
                    <div className="form-group">
                        <label htmlFor="slug">Article slug</label>
                        <input value={input.slug} name="slug" onChange={handleInputChange} type="text" placeholder='article slug' className="form-control" id='slug' />


                    </div>


                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select value={input.category} name="category" onChange={handleInputChange} className='form-control' id="category">
                            <option value="">--select article category--</option>
                            {category && category.map((item, index) =>
                                <option key={index} value={item.name}>{item.name}</option>
                            )}


                        </select>

                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <select value={input.tag} onChange={handleInputChange} className='form-control' name="tag" id="tag">
                            <option value="sdas">--select article tag--</option>

                            {tag?.map((item, index) =>
                                <option key={index} value={item.name}>{item.name}</option>
                            )}
                        </select>



                    </div>
                    <div className="form-group img_upload">
                        <label htmlFor="article text">Article text</label>

                        <Editor text={text} setText={setText} />

                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <div className="image-select">
                            <span> Upload Image</span>
                            <label htmlFor="image">Select Image</label>
                            <input type="file" onChange={handleImage} className="form-control" name='image' id='image' />
                        </div>
                        {imagePrev && <div className="image" style={{ height: "300px" }}>
                            <img style={{ objectFit: "cover", height: "100%" }} src={imagePrev} alt="" />
                        </div>}


                    </div>
                    <div className="form-group">
                        <button type='submit' className="btn btn-block">
                            {spinner ? <Spinner /> : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ArticleEdit