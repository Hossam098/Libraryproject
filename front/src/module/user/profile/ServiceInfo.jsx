import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './profile.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API_URL } from '../../../config'
import Serinfo from './Serinfo'

const ServiceInfo = () => {

  const [services, setServices] = useState([])
  const [service, setService] = useState({})
  const[flag, setFlag] = useState(false)
  
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
    <>
    <div className="subnav-contentt">
      <table>
        <thead>
          <tr>
            <td>{t('service-name')}</td>
            <td>{t('service-status')}</td>
            <td>{t('services-sub-date')}</td>
            <td>{t('moree')}</td>
          </tr>
        </thead>
        <tbody>
          {services.map((ser) => {
            return (
              <tr>
                <td>{localStorage.getItem('i18nextLng') == 'en' ? ser.service_name : ser.service_name_ar}</td>
                <td>{ser.status == 0 ? t('service1-step3') :
                  ser.status == 1 ? t('continue') :
                    ser.status == 2 ? t('wait-res') :
                      ser.status == 3 ? t('wait-edit') :
                        ser.status == 4 ? t('wait-edit') :
                          ser.status == 5 ? t('acc') :
                            ser.status == 6 ? t('rej') : null

                }</td>
                <td>{ser.req_code_date.slice(0, 10)}</td>
                <td>
                  <button className='bttn'
                   onClick={() => { setFlag(true); setService(ser); }}>
                    {t('more-det')}
                  </button>
                </td>
              </tr>
            )
          })

          }
        </tbody>
      </table>
    </div>
    {flag&&(
      <Serinfo
       service={service}
      />
    )
    }
    </>
  )
}

export default ServiceInfo