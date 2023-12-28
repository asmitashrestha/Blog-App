import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link className='links' to='/'>Home</Link>
      <Link className='links' to='/blog'>Blog</Link>
    </nav>
  )
}

export default Navbar
