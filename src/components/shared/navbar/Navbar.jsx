import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from "../../../assets/logo-main2.png";

const Navbar = () => {

  const[search, setSearch] = useState()

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleClick = () => {
    setSearch()
  }

  return (
    <nav className="navbar">
        <ul className="navbar-menu">
            <li className="navbar-logo"><Link to ="/"><img src={logo} alt="logo" className='logo'></img></Link></li>
            <li className="nav-link">
              <Link to ="/about" className='navbar-item nav-items'>About Us</Link>
              <Link to ="/contact" className='navbar-item nav-items'>Contact Us</Link>
            </li>
        </ul>
    </nav>
    
  )
}

export default Navbar
