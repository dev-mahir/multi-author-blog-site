import React, { useEffect, useState } from 'react';
import { BsAt } from 'react-icons/bs';
import { FaLock } from 'react-icons/fa';
import Navbar from '../../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../Loader/Spinner/Spinner';
import { admin_login, check_token } from '../../../redux/auth/action'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";



const AdminLogin = () => {

  const { loader, errorMessage, authenticate } = useSelector(state => state.auth);
  const token = Cookies.get('authToken');
  const dispatch = useDispatch();
  const auth_dispatch = useDispatch();
  const navigate = useNavigate();

  const decoded = jwt_decode(token);

  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const [checkEmpty, setCheckEmpty] = useState({
    email: false,
    password: false
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }
  const handleInputFocus = (e) => {
    setCheckEmpty((prevState) => ({
      ...prevState,
      [e.target.name]: false
    }))
  }

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (!input.email || !input.password) {
      !input.email && setCheckEmpty({ email: "Please provide your email" })
    } else {
      dispatch(admin_login(input, setInput, navigate));
    }
  }

  useEffect(() => {
    if (authenticate) {
      navigate('/dashboard');
    }
  }, [authenticate, navigate]);

  useEffect(() => {
    if (token) {
      if (decoded.id) {
        auth_dispatch(check_token(decoded.id))
      }

    }
  }, [token, auth_dispatch, decoded.id]);





  return <>
    <Navbar />
    <div className="admin_login">

      <div className="card">
        <div className="auth">
          <h3>Admin login</h3>
          <form onSubmit={handleAdminLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="icon-input">
                <div className="icon"><BsAt /></div>
                <input value={input.email} onFocus={handleInputFocus} onChange={handleInputChange} type="email" name='email' id='email' placeholder='email' className="form-control" />
              </div>
              <p className='error-show'>{errorMessage?.email}</p>
              <p className='error-show'>{checkEmpty.email}</p>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="icon-input">
                <div className="icon"><FaLock /></div>
                <input value={input.password} onChange={handleInputChange} type="password" name='password' id='password' placeholder='password' className="form-control" />
              </div>
              <p className='error-show'>{errorMessage?.password}</p>


            </div>
            <div className="form-group">
              <button type='submit' className="btn btn-block">
                {loader ? <Spinner /> : "Login"}
              </button>


            </div>
          </form>
        </div>
        <div className="image-logo">
          <img src="/images/register.jpg" alt="" />
        </div>
      </div>
    </div>
  </>
};

export default AdminLogin;