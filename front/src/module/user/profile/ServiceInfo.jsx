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
            axios.get(`${API_URL}/user/`, { withCredentials: true })
                .then((res) => {
                    console.log(res.data)
                    setServices(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (err) {
            console.log(err)
        }
    }, [])

  return (
    <div className="subnav-contentt">
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
        {services.map((ser)=>{
           <tr>
           <td>ser.name</td>
           <td>ser.response_text</td>
           <td>ser.response_pdf</td>
           <td>ser.submit_date</td>
           <td>{0 == 0 ? t('waiting') : 0 == 1 ? t('accepted') : t('rejected')}</td>
         </tr>
        })
        }
           
      </tbody>

    </table>
  </div>
  )
}

export default ServiceInfo