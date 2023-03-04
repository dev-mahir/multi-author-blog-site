import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { FaSearch } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import { delete_catategory, edit_category, get_cat, get_single_category } from '../../../redux/category/action';
import DeleteModal from '../../Modal/DeleteModal/DeleteModal';
import FullModal from '../../Modal/FullModal/FullModal';
import Pagination from '../../Pagination/Pagination';

const AllCategory = () => {
    const { category, single_category } = useSelector(state => state.cat);
    const dispatch = useDispatch();
    const get_dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [catId, setCatId] = useState(null);
    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false);

    const [input, setInput] = useState({
        name: "",
    });



    const handleDeleteModal = (id) => {
        setCatId(id);
        setShow(true);
    }

    const handleCategoryDelete = () => {
        dispatch(delete_catategory(catId, setShow));
    }



    const handleEditModal = (id) => {
        setCatId(id);
        setEditShow(true);
        dispatch(get_single_category(id));
    }

    const hanldeEditCategorySave = () => {
        dispatch(edit_category(catId, input, setEditShow));
    }



    const page = 1;
    const limit = 8

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        get_dispatch(get_cat(page, search, limit));
    }, [get_dispatch, search]);


    useEffect(() => {
        if (single_category) {
            setInput({
                name: single_category.name,
            })
        }
    }, [single_category]);


    return (
        <div className='all-category'>

            {show && <DeleteModal
                title="Delete category"
                description="Are you sure to want delete category?"
                close={setShow}
                handleDelete={handleCategoryDelete}
            />}

            {editShow && <FullModal title="Edit Category" close={setEditShow} handleSave={hanldeEditCategorySave}>
                <form className='edit-category'>
                    <div className="form-group">
                        <label htmlFor="">Category name</label>
                        <input type="text" name='name' value={input.name} onChange={(e) => setInput({ name: e.target.value })} className='form-control' placeholder='Name' />
                    </div>
                </form>
            </FullModal>}


            <Helmet>
                <title>All Category</title>
            </Helmet>

            <div className="show-category-action">
                <div className="numof-search-newAdd">
                    <div className="numof">
                        <h2>Category {category.length === 0 ? "" : `(${category.length})`} </h2>
                    </div>
                    <div className="searchOf">
                        <div className="search">
                            <input onChange={handleSearch} type="text" placeholder='search article' className="form-control" />
                        </div>
                        <span><FaSearch /></span>
                    </div>
                    <div className="newAdd">
                        <Link className='btn' to='/dashboard/add-category'>Add New</Link>
                    </div>
                </div>

                {category.length === 0 && <p>No category found</p>}

                <div className="height-60vh">
                    <div className="categorys">
                        {category && category.map((item, index) =>
                            <div key={index} className="category">
                                <div className="name">{item.name}</div>
                                <div className="action">
                                    <span onClick={() => handleEditModal(item._id)}><MdEdit /></span>
                                    <span onClick={() => handleDeleteModal(item._id)}><MdDelete /></span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>


            {category.length === 0 && <Pagination
                itemPerPage="5"
                totalItem="20"
                page="1"
                nextBtn=""
                prevBtn=""
            />}


        </div>
    )
}

export default AllCategory