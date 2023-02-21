import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Spinner from '../../Loader/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { add_cat } from '../../../redux/category/action';


const AddCategory = () => {
  const { spinner } = useSelector(state => state.loader);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    description: ""
  });


  const handleInputChange = (e) => {
    setInput((...prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleAddCategory = (e) => {
    e.preventDefault();
    dispatch(add_cat(input, setInput));
  }


  return (
    <div className='add-category'>
      <Helmet>
        <title>Category add</title>
      </Helmet>

      <div className="added">
        <div className="title-show-article">
          <h2>Add Category</h2>
          <Link className='btn' to="/dashboard/all-category">All Category</Link>
        </div>
        <form onSubmit={handleAddCategory}>
          <div className="form-group">
            <label htmlFor="category_name">Category name</label>
            <input type="text" name='name' value={input.name} onChange={handleInputChange} className="form-control" placeholder='Name' />
            <p className='error'>hh</p>
          </div>
          <div className="form-group">
            <label htmlFor="category_des">Category description</label>
            <textarea name='description' value={input.description} onChange={handleInputChange} type="text" className="form-control" placeholder='category description' id='category_des' />
            <p className='error'>g</p>
          </div>
          <div className="form-group">
            <button className="btn btn-block">
              {spinner ? <Spinner /> : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCategory;