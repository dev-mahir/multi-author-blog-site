import React, { useRef, useState } from 'react'
import { BsEnvelope } from "react-icons/bs";
import { FaTrash } from 'react-icons/fa';

const UserMessage = () => {

    const [toggle, setToggle] = useState(false);
    const handleMessageShow = () => {
        setToggle(!toggle)
    }
  

    return (
        <div className='message'>
            <div onClick={handleMessageShow}>
                <span><BsEnvelope /></span>
                <div className="mCount">5</div>
            </div>
            <div className={`messages ${ toggle ? "show" : ""}`}>
                <ul>
                    <li>
                        <a href="#" target='_blank'>Farid send a Email</a>
                        <div className="nDelete"><FaTrash /></div>
                    </li>
                    <li>
                        <a href="#" target='_blank'>Farid send a Email</a>
                        <div className="nDelete"><FaTrash /></div>
                    </li>
                    <li>
                        <a href="#" target='_blank'>Farid send a Email</a>
                        <div className="nDelete"><FaTrash /></div>
                    </li>
                    <li>
                        <a href="#" target='_blank'>Farid send a Email</a>
                        <div className="nDelete"><FaTrash /></div>
                    </li>
                    <li>
                        <a href="#" target='_blank'>Farid send a Email</a>
                        <div className="nDelete"><FaTrash /></div>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default UserMessage