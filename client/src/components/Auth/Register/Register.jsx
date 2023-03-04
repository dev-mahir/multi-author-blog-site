import React, { useEffect, useState } from 'react';
import { BsAt } from 'react-icons/bs';
import { FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux'
import { user_registration } from '../../../redux/auth/action';
import { toast } from 'react-toastify'
import Spinner from '../../../components/Loader/Spinner/Spinner'
import './_register.scss'

const Register = () => {
  const { loader, authenticate } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imgPreview, setImgPreview] = useState('');
  const [emptyMess, setEmptyMess] = useState('');
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    image: ""
  });

  
  
  useEffect(() => {
    if (authenticate) {
      navigate('/')
    }
  }, [authenticate, navigate]);




  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setEmptyMess("")

  }
  const handleImage = (e) => {
    setInput({
      ...input,
      image: e.target.files[0]
    })
    setImgPreview(URL.createObjectURL(e.target.files[0]));
  }

  const handleUserRegistration = (e) => {
    e.preventDefault();
    if (!input.name || !input.email || !input.password || !input.image) {
      setEmptyMess("All fields are required");
    } else {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("image", input.image);
      dispatch(user_registration(formData, setInput, setImgPreview, e, navigate));
    }
  }



  return <>
    <Navbar />
    <div className="register">
      <div className="card">
        <div className="auth">
          <h3>Register</h3>
          <form onSubmit={handleUserRegistration}>
            <div className="form-group">
              <label htmlFor="userName">User Name</label>
              <div className="icon-input">
                <div className="icon"><FaUser /></div>
                <input type="text" name='name' value={input.name} onChange={handleInputChange} id='userName' placeholder='user name' className="form-control" />
              </div>
              <p></p>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="icon-input">
                <div className="icon"><BsAt /></div>
                <input type="email" value={input.email} onChange={handleInputChange} name='email' id='email' placeholder='email' className="form-control" />
              </div>
              <p></p>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="icon-input">
                <div className="icon"><FaLock /></div>
                <input type="password" value={input.password} onChange={handleInputChange} name='password' id='password' placeholder='password' className="form-control" />
              </div>
              <p></p>
            </div>
            <div className="form-group">
              <input hidden type="file" onChange={handleImage} name='image' id='reg-image' />
              <div className="image-file">
                <div className="image">

                  <img src={imgPreview ? imgPreview : '/images/avatar.png'} alt='profile' />
                </div>
                <div className="file-name">

                  <label htmlFor="reg-image">Upload image</label>
                </div>
              </div>

            </div>
            {emptyMess && <p className='empty-fields'>{emptyMess}</p>}
            <div className="form-group">

              <button className="btn btn-block">
                {loader ? <Spinner /> : "Register"}
              </button>

            </div>
            <div className="form-group">
              <div className="login-pag">
                <Link to='/login'>login your account</Link>
              </div>
            </div>
          </form>
        </div>
        <div className="image-logo">
          <img src="/images/register.jpg" alt="" />
        </div>
      </div>
    </div>
  </>;
};

export default Register;