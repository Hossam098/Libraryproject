import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Nav = () => {

  const navigate = useNavigate();

  const logout = () => {
    axios.get('http://localhost:5000/logout', { withCredentials: true })
      .then((res) => {
        navigate('/adminLogin')
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
          <Link to='/manager/list' > مراجعه الطلبات </Link>
        </li>
        <li>
          <Link to= '/manager'> عرض جميع الطلاب</Link>
        </li>
      </ul>
    </nav>
    </div>

  )
}

export default Nav