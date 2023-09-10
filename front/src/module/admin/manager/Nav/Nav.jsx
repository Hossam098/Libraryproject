import React from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../../../config'


const Nav = () => {

  const navigate = useNavigate();

  const logout = () => {
    axios.get(`${API_URL}/authmanager/logout`, { withCredentials: true })
      .then((res) => {
        navigate('/ManagerLogin')
      }).catch((error) => {
        console.log(error.response)
      })
  }


  return (
    <div className="dmin">
      <nav className=''>
        <button
          onClick={logout}
          className="btn">
          <NavLink style={{ color: "white", textDecoration: "none" }}> تسجيل الخروج</NavLink>
        </button>
        <ul>
          <li>
            <NavLink to='/manager/reviewed'> الطلبات التي تمت مراجعتها </NavLink>
          </li>
          <li>
            <NavLink to='/manager'> مراجعه الطلبات </NavLink>
          </li>
          <li>
            <NavLink to='/manager/list' >  عرض جميع الطلبات </NavLink>
          </li>
        </ul>
      </nav>
    </div>

  )
}

export default Nav