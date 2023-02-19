import React from 'react';
import { BsTrash } from "react-icons/bs";
import { FaFacebookSquare, FaGoogle, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Comments = () => {
  return (
    <>
      <div className='comments'>

      
          <div className="main-reply-comment">
            <div className="image-comment-time-name">
              <img src='' alt="" />
              <div className="name-time-comment">
                <div className="name-time">
                  <h4>userName</h4>
                  <span>10 day ago</span>
                </div>
                <p>nice post</p>
                <div className="replay_btn">
                  
                     <button >Reply</button>
                  
                </div>
                <div className='reply_box'>
                  <div className="image-input">
                    <img src='' alt="" />
                    <input type="text" required placeholder='add a public reply' />
                  </div>
                  <div className="reply_submit">
                    <button  className='cancle'>Cancel</button>
                    <button  className='submit'>Submit</button>
                  </div>
                </div>
                
                   <div className="reply_comment">
                    <div className="reply_comment_image_name_time">
                      <img src='' alt="" />
                      <div className="name-time-comment">
                        <div className="name-time">
                          <h4>repla Name</h4>
                          <span>10 day ago</span>
                        </div>
                        <p>ddd</p>
                        <div className="replay_btn">
                          
                            <button>Reply</button>
                          
                        </div>
                        <div className='reply_box'>
                          <div className="image-input">
                            <img src='' alt="" />
                            <input  value='' type="text" required placeholder='add a public reply' />
                          </div>
                          <div className="reply_submit">
                            <button  className='cancle'>Cancel</button>
                            <button className='submit'>Submit</button>
                          </div>
                        </div>
                      </div>
                    </div>
                     <div className="action"  ><BsTrash /></div>
                    
                  </div>
                
              </div>
            </div>
            
              <div className="action"><BsTrash /></div>
            
          </div>
      
      </div>
      <div className="comment_submit">
        <h2>Give Your Comment</h2>
        
           <form>
            <div className="form-group">
              <textarea required  className='form-control' placeholder='write something' name="" id="" cols="20" rows="10"></textarea>
            </div>
            <div className="form-group">
              <button disabled className="btn">Submit</button>
            </div>
        </form>
        <u className='login-first'>
            <li className='btn'>
              <span><FaFacebookSquare /></span>
              <button className='btn'>Login Facebook</button>
            </li>
            <li className='btn'>
              <span><FaLock /></span>
              <Link to='/login'>Login</Link>
            </li>
            <li className='btn'>
              <span><FaGoogle /></span>
              <button className='btn'>Login Google</button>
            </li>
          </u>
        
      </div>
    </>
  )
}

export default Comments