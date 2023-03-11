import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  
  return (
    <footer>
      <div className="container">
        <div className="copyright">
          <div className="text">
            <p>Created by <Link to="/">Md Mahir</Link></p>
          </div>
          <div className="terms">
            <Link to="/">Terms and Condition</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer;
