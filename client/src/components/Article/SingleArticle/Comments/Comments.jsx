import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BsTrash } from "react-icons/bs";
import { FaFacebookSquare, FaGoogle, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { add_comment, add_reply, get_comment } from '../../../../redux/comment/action';
import ReactTimeAgo from 'react-time-ago'



const Comments = ({ single_article }) => {
  const { userInfo, authenticate } = useSelector(state => state.auth);
  const { comments } = useSelector(state => state.commentReducer);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyBox, setReplayBox] = useState(false);
  const dispatch = useDispatch();

  const handleReplyBoxShow = (index) => {
    setReplayBox(index);
  }



  const handleSubmitComment = (e) => {
    e.preventDefault();
    const data = {
      article_id: single_article._id,
      article_slug: single_article.slug,
      article_title: single_article.title,
      user_name: userInfo.name,
      user_image: userInfo.image,
      comment_text: commentText
    }
    dispatch(add_comment(data, setCommentText));
  }


  const handleSubmitReply = (commentId) => {
    const data = {
      reply_name: userInfo.name,
      reply_image: userInfo.image,
      reply_time: Date.now(),
      reply_text: replyText,
      comment_id: commentId
    }
    dispatch(add_reply(commentId, data, setReplyText));
  }



  useEffect(() => {
    dispatch(get_comment(single_article._id));
  }, [single_article])


  return (
    <>
      <div className="comment_title">
        {comments && <h3>Article comments</h3>}
      </div>
      <div className='comments'>

        {comments && comments.map((item, index) => {
          const date = new Date(item.createdAt);

          return <div key={index}>
            <div className="main-reply-comment">
              <div className="image-comment-time-name">
                <img src='' alt="" />
                <div className="name-time-comment">
                  <div className="name-time">
                    <h4>{single_article?.admin_name}</h4>
                    <span>
                      <ReactTimeAgo date={date} locale="en-US" />
                    </span>
                  </div>
                  <p>{item.comment_text}</p>


                  <div className="reply_comment">

                    {item.reply_comment.map((replyItem, index) => (
                      <div key={index}>
                        <img src="" alt="" />
                        <div className="name-time-comment reply ">
                          <div className="name-time">
                            <h4>{replyItem.reply_name}</h4>
                            <span>time</span>
                          </div>
                          <div className='reply-text'>
                            <p>{replyItem.reply_text}</p>
                            {userInfo?.role === "admin" && <div className="action"><BsTrash /></div>}

                          </div>
                        </div>

                      </div>
                    ))}





                  </div>




                  {replyBox === index && <div className='reply_box'>
                    <div className="image-input">
                      <img src='' alt="" />
                      <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder='add a public reply' />
                    </div>
                    <div className="reply_submit">
                      <button onClick={() => setReplayBox(null)} className='cancle'>Cancel</button>
                      <button onClick={() => handleSubmitReply(item._id)} className='submit'>Submit</button>
                    </div>
                  </div>}

                  <div className="reply_comment_image_name_time">
                    <div className="replay_btn">

                      {replyBox !== index && authenticate && <button onClick={() => handleReplyBoxShow(index)}>Reply</button>}

                    </div>
                  </div>


                </div>
              </div>

              {userInfo?.role === "admin" && <div className="action"><BsTrash /></div>}

            </div>
          </div>

        }


        )}


      </div>




      <div className="comment_submit">
        <h2>Give Your Comment</h2>

        {userInfo?.role === 'user' && <form onSubmit={handleSubmitComment}>
          <div className="form-group">
            <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} className='form-control' placeholder='write something'></textarea>
          </div>
          <div className="form-group">
            <button disabled={commentText ? false : true} type='submit' className="btn">Submit</button>
          </div>
        </form>}


        {!authenticate && <ul className='login-first'>
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
        </ul>}

      </div>
    </>
  )
}

export default Comments