import React from 'react'
import './NavBar.css'
import { NavLink } from 'react-router-dom'
import { CgGym } from "react-icons/cg"
import DateSelector from '../../components/datePicker/DateSelector.jsx'


const NavBar = () => {

  return (
    <header className='navbar-header'>
      <NavLink to='/' className='navbar-logo'>Workout Planner <CgGym className='navbar-icon'/></NavLink>
      
      <nav className='navbar-links'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/planner'>Planner</NavLink>
        <NavLink to='/session'>Session</NavLink>
      </nav>
    </header>
  )
}

export default NavBar