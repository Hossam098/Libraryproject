import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
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
      <nav >
        <button
          onClick={logout}
          className="btn">
          <Link style={{ color: "white", textDecoration: "none" }}> تسجيل الخروج</Link>
        </button>

        <ul>
          <li>
            <Link to='/manager'> مراجعه الطلبات </Link>
          </li>
          <li>
            <Link to='/manager/list' >  عرض جميع الطلبات </Link>
          </li>
        </ul>
      </nav>
    </div>

  )
}

export default Nav