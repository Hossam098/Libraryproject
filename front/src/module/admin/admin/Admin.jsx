import React from 'react'
import Nav from './Nav/Nav'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div>
        <Nav/>
        <Outlet/>
    </div>
  )
}

export default Admin