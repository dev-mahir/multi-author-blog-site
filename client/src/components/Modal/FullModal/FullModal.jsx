import React, { useEffect, useRef } from 'react';
import './full-modal.css';
import { AiOutlineWarning } from 'react-icons/ai'
import { GrFormClose } from 'react-icons/gr';



const FullModal = ({ title, children, close, handleSave }) => {
  const ref = useRef();
  useEffect(() => {
  
    window.addEventListener('click',(e) => {
      if (e.target.contains(ref?.current)) {
       return close(false);
      }
    });
  }, [close])



  return (
    <div className='full-modal-wrapper' ref={ref}>
      <div style={{ width: "450px" }} className="full-modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <span className='close' onClick={() => close(false)}> <GrFormClose /></span>
        </div>
        {children}
        <div className="modal-footer">
          <button onClick={() => close(false)}>Cancel</button>
          <button onClick={() => handleSave()}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default FullModal