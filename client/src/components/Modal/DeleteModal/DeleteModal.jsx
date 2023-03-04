import React from 'react';
import './delete-modal.css'
import { AiOutlineWarning } from 'react-icons/ai'
import { GrFormClose } from 'react-icons/gr';



const DeleteModal = ({ title, description, close, handleDelete }) => {
  return (
    <div className='full-modal-wrapper'>
      <div style={{ width: "450px" }} className="full-modal-content">
        <div className="modal-header">
          <div>
            <span> <AiOutlineWarning /> </span>
            <h3>{title}</h3>
          </div>
          <span className='close' onClick={() => close(false)}> <GrFormClose /></span>
        </div>
        <p>{description}</p>
        <div className="modal-footer">
          <button onClick={() => close(false)}>Cancel</button>
          <button onClick={() => handleDelete()}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal