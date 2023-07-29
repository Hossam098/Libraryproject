import React from 'react'
import Unav from '../../../components/userNav/Unav'
import {Outlet} from 'react-router-dom';
import './upage.css'

const Upage = () => {
  return (
    <div className='pageContainer'>
        <Unav/>
        <div className="out">
          <Outlet/>
        </div>
        
    </div>
  )
}

export default Upage