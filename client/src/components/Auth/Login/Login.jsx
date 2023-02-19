import React from 'react';
import { BsAt } from 'react-icons/bs';
import { FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';

import { Link } from "react-router-dom";
import Navbar from '../../Navbar/Navbar';

const Login = () => {



  return <>
    <Navbar />
    <div className="login">
   
      
      <div className="card">
        <div className="auth">
          <h3>Login</h3>
          <form action="">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="icon-input">
                <div className="icon"><BsAt /></div>
                <input  type="email" name='email' id='email' placeholder='email' className="form-control" />
              </div>
              <p></p>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="icon-input">
                <div className="icon"><FaLock /></div>
                <input  type="password" name='password' id='password' placeholder='password' className="form-control" />
              </div>
              <p></p>
            </div>
            <div className="form-group">
              <button  className="btn btn-block">
                  Login
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
          <div className="login-page">
            <Link to='/register'>Register your account</Link>
          </div>
        </div>
        <div className="image-logo">
          <img src="/images/register.jpg" alt="" />
        </div>
      </div>
    </div>
  </>;
};

export default Login;