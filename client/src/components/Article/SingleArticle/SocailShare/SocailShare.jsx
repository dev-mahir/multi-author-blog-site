import React from 'react'
import { FaFacebookSquare, FaGithubSquare, FaTwitterSquare } from 'react-icons/fa'
import { ImLinkedin } from 'react-icons/im';
import './_socailshare.scss'

const SocailShare = () => {
  return (
    <div>
      <h3>Share this post:</h3>
      <div className="social-icons">
        <a className='l1' href=""><FaFacebookSquare /></a>
        <a className='l2' href=""><FaTwitterSquare /></a>
        <a className='l3' href=""><FaGithubSquare /></a>
        <a className='l4' href=""><ImLinkedin /></a>
      </div>
  </div>
  )
}

export default SocailShare