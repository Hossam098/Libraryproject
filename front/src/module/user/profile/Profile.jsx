import React, { useState, useEffect } from 'react'
import './profile.css'
import { Link } from 'react-router-dom'
import profileimg from '../../../images/Ellipse 1.png'
import { MdOutlineModeEdit } from 'react-icons/md'
import { GrAdd } from 'react-icons/gr'
import Unav from '../../../components/userNav/Unav'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { API_URL } from '../../../config'
import { use } from 'i18next'
import ProfileInfo from './ProfileInfo'
import ServiceInfo from './ServiceInfo'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const [user, setUser] = useState({})
  const [showPersonal, setShowPersonal] = useState(true)
  const [imgUser, setImgUser] = useState('')






  useEffect(() => {
    axios.defaults.withCredentials = true
    try {
      axios.get(`${API_URL}/user/getuser`, { withCredentials: true })
        .then((res) => {
          setUser(res.data)
          setImgUser(res.data.img)
        })
        .catch((err) => {
          if (err.response.status === 401) {
            window.location.href = "/"
          }
          console.log(err)
        })


    } catch (error) {
      console.log(error)
    }
  }, [])

  const edituser = () => {
    const formData = new FormData()
    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('national_id', user.national_id)
    formData.append('phone', user.phone)
    formData.append('nationality', user.nationality)
    formData.append('university', user.university)
    formData.append('faculity', user.faculity)
    formData.append('department', user.department)
    formData.append('img', user.img)
    try {
      axios.put(`${API_URL}/user/updateuser`, formData, { withCredentials: true })
        .then((res) => {
          window.location.reload()
        })
        .catch((err) => {
          if (err.response.status === 401) {
            window.location.href = "/"
          }
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  }






  return (
    <>
      <div className="profile-container" style={{ direction: i18n.language == "ar" ? "rtl" : "ltr", backgroundColor: '#f5f5f5' }}>

        <div className="subnav">
          <div className="p-img-container">
            <div className="p-i-c">
              <img src={user.img == "" || user.img == null ? profileimg : `${API_URL}/${user.national_id}/${imgUser}`} alt="profile" />
            </div>
            <div className="editbutton">

              <label For="p-image">
                <MdOutlineModeEdit />
              </label>
              <input
                type="file"
                hidden
                id='p-image'
                name='p-image'
                onChange={(e) => { setUser({ ...user, img: e.target.files[0] }) }}
              />

            </div>
            {user.img?.name &&
              <h1 style={{ color: 'red', textAlign: 'center' }}>
                {user.img.name}
              </h1>
            }

          </div>
          <h1>{user.name}</h1>
          <div className="subnav-header">
            <button
              className={showPersonal ? 'btn-subnav-header active' : 'btn-subnav-header'}
              onClick={() => setShowPersonal(true)}
            >
              {t('per-info')}
            </button>
            <button
              className={!showPersonal ? 'btn-subnav-header active' : 'btn-subnav-header'}
              onClick={() => setShowPersonal(false)}
            >
              {t('ser-reged')}
            </button>
          </div>

          {showPersonal ?
            <ProfileInfo
              user={user}
              setUser={setUser}
              edituser={edituser}
            />
            :
            <ServiceInfo User={user} />
          }
        </div>

      </div>
    </>
  )
}

export default Profile

