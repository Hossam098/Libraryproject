import React, { useState } from 'react'
import './navbar.css'
import { Link, NavLink } from 'react-router-dom'
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
  const [active, setActive] = useState('home_active')

  return (
    <div className="dmin">
      <nav className='mnav'>
        <button
          onClick={logout}
          className="btn">
          <Link style={{ color: "white", textDecoration: "none" }}> تسجيل الخروج</Link>
        </button>
        <ul style={{ direction: "rtl" }}>
          <li>
            <Link 
            onClick={() => setActive('all_active')}
            className={active === 'all_active' ? 'active' : ''}
            exact to='/manager/all'
            > عرض جميع الطلبات </Link>
          </li>
          <li>
            <Link 
            onClick={() => setActive('home_active')}
            className={active === 'home_active' ? 'active' : ''}
            exact to='/manager'
            > توزيع الطلبات </Link>
          </li>
          <li>
            <Link 
            onClick={() => setActive('LIST_active')}
            className={active === 'LIST_active' ? 'active' : ''}
            to='/manager/Review'> الطلبات الموزعة لك  </Link>
          </li>
          <li>
           
            <Link
            onClick={() => setActive('REVIWED_active')}
            className={active === 'REVIWED_active' ? 'active' : ''}
            to='/manager/reviewed'> الطلبات التي تمت مراجعتها </Link>
          </li>
        </ul>
      </nav>
    </div>

  )
}

export default Nav