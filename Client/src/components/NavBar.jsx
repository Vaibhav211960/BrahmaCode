import React from 'react'
import { NavLink } from 'react-router-dom'
import "./style.css"

const NavBar = () => {
  return (

    <nav>
        <div className='logo'>
            <img src="" alt="" />
        </div>
        <div className='links'>
            <NavLink to="/">
            Home
        </NavLink>
        <NavLink to="/features">
            Features
        </NavLink>
        <NavLink to='/about'>
            About
        </NavLink>
        <NavLink to="/contact">
            Contact
        </NavLink>
        
        <NavLink className='login' to="/login">
            Login
        </NavLink>
        </div>
    </nav>
  )
}

export default NavBar