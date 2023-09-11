import React from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../../../config'


const ANav = () => {

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
          <NavLink to='/' > احصائيات </NavLink>
          </li>
          <li>
            <NavLink to='/يسي'>  المخططات </NavLink>
          </li>
          <li>
            <NavLink to='/manager/list' > ييبيبيب </NavLink>
          </li>
        </ul>
      </nav>
    </div>

  )
}

export default ANav