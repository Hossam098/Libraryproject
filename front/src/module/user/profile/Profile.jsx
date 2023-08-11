import React, { useState, useEffect } from 'react'
import './profile.css'
import { Link } from 'react-router-dom'
import profileimg from '../../../images/Ellipse 1.png'
import { RiUserSettingsLine } from 'react-icons/ri'
import { GrAdd } from 'react-icons/gr'
import Unav from '../../../components/userNav/Unav'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { API_URL } from '../../../config'
import { use } from 'i18next'

const Profile = () => {

  const { t, i18n } = useTranslation()
  const [user, setUser] = useState([])
  const [showPersonal, setShowPersonal] = useState(true)
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







  return (
    <>
      <div className="profile-container" style={{ direction: i18n.language == "ar" ? "rtl" : "ltr", backgroundColor: '#f5f5f5' }}>
        {Array.isArray(user) ? (
          user.map((item, index) => {
            return (
              <div className="subnav">
                <img src={user.img == "" || user.img == null ? profileimg : user.img} alt="profile" />
                <h1>{item.name}</h1>
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
                  personalInformation(t, item)
                  :
                  <div className="subnav-content">
                    <table>
                      <thead>
                        <tr>
                          <th>{t('ser-name')}</th>
                          <th>{t('ser-type')}</th>
                          <th>{t('ser-date')}</th>
                          <th>{t('ser-status')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reg.map((item, index) => {
                          return (
                            <tr>
                              <td>{item.name}</td>
                              <td>{item.response_text}</td>
                              <td>{item.response_pdf}</td>
                              <td>{item.submit_date}</td>
                              <td>{item.status == 0 ? t('waiting') : item.status == 1 ? t('accepted') : t('rejected')}</td>
                            </tr>
                          )
                        })}
                        
                        </tbody>

                    </table>
                  </div>
                }
              </div>
            )
          })
        ) : null}
      </div>
    </>
  )
}

export default Profile

function personalInformation(t, item) {
  return <div className="subnav-content">
    <div className="subnav-content-item">
      <h3>{t('name')}</h3>
      <input type="text" value={item.name} />
    </div>
    <div className='subnav-content-item'>
      <h3>{t('email')}</h3>
      <input type="text" value={item.email} />
    </div>
    <div className='subnav-content-item'>
      <h3>{t('n-id')}</h3>
      <input type="text" value={item.national_id} />
    </div>
    <div className='subnav-content-item'>
      <h3>{t('phone')}</h3>
      <input type="text" value={item.phone} />
    </div>
    <div className='subnav-content-item'>
      <h3>{t('nation')}</h3>
      <input type="text" value={item.nationality} />
    </div>
    <div className='subnav-content-item'>
      <h3>{t('uni')}</h3>
      <input type="text" value={item.university} />
    </div>
    <div className='subnav-content-item'>
      <h3>{t('fac')}</h3>
      <input type="text" value={item.faculity} />
    </div>
    <div className='subnav-content-item'>
      <h3>{t('dep')}</h3>
      <input type="text" value={item.department} />
    </div>
    <button className="waitbtn-edit">
      {t('edit-btn')}

    </button>
  </div>
}
