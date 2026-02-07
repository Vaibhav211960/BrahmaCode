import React from 'react'
import { NavLink } from 'react-router-dom'
import "./style.css"

const NavBar = () => {
  return (

    <nav>
        <div className="flex items-center space-x-3 mt-2 mb-2">
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-900">
                  ArenaFitCheck
                </span>
        </div>
        <div className='links'>
            <NavLink to="/">
            Home
        </NavLink>
        <NavLink to="/YoloTestForm">
            YoloTest
        </NavLink>
        <NavLink to="/RunningMockTest">
            Mock
        </NavLink>
        <NavLink to='/about'>
            About
        </NavLink>
        
        <NavLink className='login' to="/login">
            Login
        </NavLink>
        </div>
    </nav>
  )
}

export default NavBar