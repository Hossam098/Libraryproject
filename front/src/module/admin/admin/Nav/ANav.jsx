import React from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../../../config'


const ANav = () => {

  const navigate = useNavigate();

  const logout = () => {
    axios.get(`${API_URL}/authadmin/logout`, { withCredentials: true })
      .then((res) => {
        navigate('/AdminLOgin')
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
           تسجيل الخروج
        </button>
        <ul style={{ direction: "rtl" }}>
          <li>
            <NavLink to='' > احصائيات </NavLink>
          </li>
          <li>
            <NavLink to='/Admin/all'> المستخدمين </NavLink>
          </li>
          <li>
            <NavLink to='/Admin/admins' > الموظفين </NavLink>
          </li>
        </ul>
      </nav>
    </div>

  )
}

export default ANav