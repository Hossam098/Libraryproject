import React from 'react'
import Unav from '../../../components/userNav/Unav'
import {Outlet} from 'react-router-dom';
import './upage.css'
import { useEffect } from 'react';

const Upage = () => {

  useEffect(() => {
    try{
      if(!localStorage.getItem('token')){
        window.location.href = '/login'
      }
    }catch(err){
      console.log(err)
    }
  }, [])
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