import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { FaArrowUp } from "react-icons/fa"
import {  Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/Sidebar/Sidebar';
import './_home.scss'

const HomePage = () => {

  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  }

  return (
    <div className='home'>
      <Navbar />
      <div className="main-content">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <Outlet />
            </div>
            <div className="col-4">
              <Sidebar/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div id="scroll">
        <button onClick={handleScrollTop} className="scroll-btn">
          <FaArrowUp />
        </button>
      </div>
    </div>
  )
}

export default HomePage;