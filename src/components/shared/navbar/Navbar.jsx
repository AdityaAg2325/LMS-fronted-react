import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from "../../../assets/logo-main2.png";
import userLogo from "../../../assets/profile-account.png";
import { useSelector } from 'react-redux';
import Tooltip from '../tooltip/Tooltip';

const Navbar = () => {
  const auth = useSelector(state => state.auth)
  return (
    <nav className="navbar">
        <ul className="navbar-menu">
            <li className="navbar-logo"><Link to ="/"><img src={logo} alt="logo" className='logo'></img></Link></li>
            <li className="nav-link">
              {auth?.role === "ROLE_ADMIN" ? (
                <>
                <Link to ="/about" className='navbar-item nav-items'>About Us</Link>
                <div className='navbar-logo profile-logo'>
              <Tooltip tooltipText={`Welcome, ${auth?.name}`}>
                <img src={userLogo} alt='user-logo' className='logo user-profile-logo'/>
              </Tooltip>
            </div>
                </>
              ) : auth?.role === "ROLE_USER" ? (
              <>
              <Link to ="/about" className='navbar-item nav-items'>About Us</Link>
              <Link to ="/contact" className='navbar-item nav-items'>Contact Us</Link>
              <div className='navbar-logo profile-logo'>
              <Tooltip tooltipText={`Welcome, ${auth?.name}`}>
                <img src={userLogo} alt='user-logo' className='logo user-profile-logo'/>
              </Tooltip>
            </div>
              </>
            ) : (
              <>
              <Link to ="/about" className='navbar-item nav-items'>About Us</Link>
              <Link to ="/contact" className='navbar-item nav-items'>Contact Us</Link>
              </>
            )
          }
            </li>
        </ul>
    </nav>
    
  )
}

export default Navbar
