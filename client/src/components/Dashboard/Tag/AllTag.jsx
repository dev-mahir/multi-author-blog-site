import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { FaSearch } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import { add_tag, get_tag } from '../../../redux/tag/action';
import { delete_tag, edit_tag, get_single_tag } from '../../../redux/tag/action';
import DeleteModal from '../../Modal/DeleteModal/DeleteModal';
import FullModal from '../../Modal/FullModal/FullModal';
import Pagination from '../../Pagination/Pagination';

const AllTag = () => {
  const { tag, single_tag } = useSelector(state => state.tag);
  const dispatch = useDispatch();
  const get_dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [tagId, setTagId] = useState(null);
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [addShow, setAddShow] = useState(false);

  const [input, setInput] = useState({
    name: "",
  });



  const hanldeAddtagSave = () => {
    if (!input.name) {
      toast.error("Fields is required");
    } else {
      dispatch(add_tag(input,setInput, setAddShow));
    }
  }


  const handleDeleteModal = (id) => {
    setTagId(id);
    setShow(true);
  }

  const handletagDelete = () => {
    dispatch(delete_tag(tagId, setShow));
  }



  const handleEditModal = (id) => {
    setTagId(id);
    setEditShow(true);
    dispatch(get_single_tag(id));
  }

  const hanldeEdittagSave = () => {
    dispatch(edit_tag(tagId, input, setEditShow));
  }





  const page = 1;
  const limit = 8

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    get_dispatch(get_tag(page, search, limit));
  }, [get_dispatch, search]);


  useEffect(() => {
    if (single_tag) {
      setInput({
        name: single_tag?.name,
      })
    }
  }, [single_tag]);



  return (
    <div className='all-category'>

      
      {show && <DeleteModal
        title="Delete tag"
        description="Are you sure to want delete tag?"
        close={setShow}
        handleDelete={handletagDelete}
      />}

      {editShow && <FullModal title="Edit tag" close={setEditShow} handleSave={hanldeEdittagSave}>
        <form className='edit-tag'>
          <div className="form-group">
            <label htmlFor="">Tag name</label>
            <input type="text" name='name' value={input.name} onChange={(e) => setInput({ name: e.target.value })} className='form-control' placeholder='Name' />
          </div>
        </form>
      </FullModal>}

      {addShow && <FullModal
        title="Add tag"
        close={setAddShow}
        handleSave={hanldeAddtagSave}>
        <form className='edit-tag'>
          <div className="form-group">
            <label htmlFor="">Tag name</label>
            <input type="text" name='name' value={input.name} onChange={(e) => setInput({ name: e.target.value })} className='form-control' placeholder='Name' />
          </div>
        </form>
      </FullModal>}


      <Helmet>
        <title>All tag</title>
      </Helmet>

      <div className="show-category-action">
        <div className="numof-search-newAdd">
          <div className="numof">
            <h2>Tag ({tag.length})</h2>
          </div>
          <div className="searchOf">
            <div className="search">
              <input onChange={handleSearch} type="text" placeholder='search article' className="form-control" />
            </div>
            <span><FaSearch /></span>
          </div>
          <div className="newAdd">
            <button onClick={() => setAddShow(true)} className='btn'>Add New</button>
          </div>
        </div>
        <div className="height-60vh">
          <div className="categorys">
            {tag.length >0  && tag.map((item, index) =>
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

      {
        tag.length > 0 && <Pagination
          itemPerPage="5"
          totalItem="20"
          page="1"
          nextBtn=""
          prevBtn=""
        />}
    </div>
  )
}

export default AllTag