import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './profile.css'
import axios from 'axios'
import { API_URL } from '../../../config'

const ServiceInfo = () => {

    const [services, setServices] = useState([])
    const { t } = useTranslation();

    useEffect(() => {

      axios.defaults.withCredentials = true
      try {
          axios.get(`${API_URL}/auth/check`, { withCredentials: true })
              .then((res) => {
                  console.log(res)
              })
              .catch((err) => {
                  console.log(err)
                  window.location.href = '/login'
              })
          axios.get(`${API_URL}/getallwaiting`, { withCredentials: true })
              .then((res) => {
                  console.log(res.data)
                  setServices(res.data)
              })
              .catch((err) => {
                  console.log(err)
                  if (err.response.status == 400) {
                      window.location.href = '/'
                  }
              })


      } catch (err) {
          console.log(err)
      }
  }, [])

  return (
    <div className="subnav-contentt">

  </div>
  )
}

export default ServiceInfo