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

const Profile = () => {

  const { t, i18n } = useTranslation()
  const [user, setUser] = useState({})
  const [showPersonal, setShowPersonal] = useState(true)
  const [selectedImage, setSelectedImage] = useState();
  const [reg, setReg] = useState([])
  const [formation, setFormation] = useState([])
  const [personal, setPersonal] = useState([])
  const [magazine, setMagazine] = useState([])
  const [bestMessage, setBestMessage] = useState([])


  useEffect(() => {
    axios.defaults.withCredentials = true
    try {
      axios.get(`${API_URL}/user/getuser`, { withCredentials: true })
        .then((res) => {
          console.log(res.data)
          setUser(res.data)
        })
        .catch((err) => {
          if (err.response.status === 401) {
            window.location.href = "/"
          }
          console.log(err)
        })

      axios.get(`${API_URL}/getallwaitingofregistration`, { withCredentials: true })
        .then((res) => {
          console.log(res.data)
          setReg(res.data)
        })
        .catch((err) => {
          console.log(err)
        })

      axios.get(`${API_URL}/getallwaitingofformation`, { withCredentials: true })
        .then((res) => {
          console.log(res.data)
          setFormation(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      axios.get(`${API_URL}/getallwaitingofpersonal`, { withCredentials: true })
        .then((res) => {
          console.log(res.data)
          setPersonal(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      axios.get(`${API_URL}/getallwaitingofmagazine`, { withCredentials: true })
        .then((res) => {
          console.log(res.data)
          setMagazine(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      axios.get(`${API_URL}/getallwaitingofbestmessage`, { withCredentials: true })
        .then((res) => {
          console.log(res.data)
          setBestMessage(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const edituser () =>{
    try {
      axios.get(`${API_URL}/user/`, { withCredentials: true })
        .then((res) => {
          console.log(res.data)
          setUser(res.data)
        })
        .catch((err) => {
          if (err.response.status === 401) {
            window.location.href = "/"
          }
          console.log(err)
        })
  }






  return (
    <>
      <div className="profile-container" style={{ direction: i18n.language == "ar" ? "rtl" : "ltr", backgroundColor: '#f5f5f5' }}>

              <div className="subnav">
                <div className="p-img-container">
                  <img src={user.img == "" || user.img == null ? profileimg : user.img} alt="profile" />
                  <div className="editbutton">

                    <label For="p-image">
                      <MdOutlineModeEdit />
                    </label>
                    <input 
                      type="file"
                      hidden
                      id='p-image'
                      name='p-image'
                      onChange={(e)=>{setSelectedImage(e.target.files[0])}}
                    />
                    
                  </div>
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
                  />
                  :
                    <ServiceInfo/>
                }
              </div>
           
      </div>
    </>
  )
}

export default Profile

