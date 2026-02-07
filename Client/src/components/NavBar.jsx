import React from 'react'
import { NavLink } from 'react-router-dom'
import "./style.css"
import { 
  LogOut
} from 'lucide-react';

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
            TechnicalTest
        </NavLink>
        <NavLink to='/about'>
            About
        </NavLink>
        
        <NavLink  to="/logout">
            <button
            //   onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
        </NavLink>
        </div>
    </nav>
  )
}

export default NavBar