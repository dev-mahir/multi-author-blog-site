import React from 'react';
import Login from '../../components/Auth/Login/Login';
import Navbar from '../../components/Navbar/Navbar';
import './_loginPage.scss'

const LoginPage = () => {


  return <>
    <Navbar />
    <div className="login-page">
      <div className="card">
        <div className="login-com">
           <Login />
       </div>
        <div className="image-logo">
          <img src="/images/register.jpg" alt="" />
        </div>
      </div>
    </div>
  </>;
};


export default LoginPage;