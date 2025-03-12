import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import footer from './footer'
import Footer from './footer'
const body = () => {
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default body