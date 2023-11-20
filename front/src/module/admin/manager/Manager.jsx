import React from 'react'
import Nav from './Nav/Nav'
import NavTop from './Nav/NavTop'
import { Outlet } from 'react-router-dom'

const Manager = () => {
  return (
    <div>
        <NavTop/>
        <Nav/>
        <Outlet/>
    </div>
  )
}

export default Manager