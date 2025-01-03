import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='py-4 px-8 flex flex-col min-h-screen'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layout