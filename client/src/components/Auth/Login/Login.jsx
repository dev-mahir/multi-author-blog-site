import React, { useEffect, useState } from 'react';
import { BsAt } from 'react-icons/bs';
import { FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { user_login } from '../../../redux/auth/action';
import Spinner from '../../Loader/Spinner/Spinner';
import './_login.scss'


const Login = () => {
  const { authenticate } = useSelector(state => state.auth);
  const { spinner } = useSelector(state => state.loader);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (!input.email || !input.password) {
    } else {
      dispatch(user_login(input, setInput));
    }
  }


  useEffect(() => {
    if (authenticate) {
      return navigate('/')
    }
  }, [authenticate, navigate]);


  return (
    <div className="login-card">
      <div className="auth">
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
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
            <button type='submit' className="btn btn-block">
              {spinner ? <Spinner /> : "Login"}
            </button>
          </div>
        </form>
        <div className="or">or</div>
        <div className="fb-google-auth">
          <div className="fb-google-logo">
            <div className="fb">
              <button><FaFacebook /> <span>signup with facebook</span></button>
            </div>
            <div className="google">
              <button><FaGoogle /><span>signup with google</span></button>
            </div>
          </div>
        </div>
        <div className="login-pag">
          <Link to='/register'>Register your account</Link>
        </div>
      </div>
    </div>



  )
}

export default Login;