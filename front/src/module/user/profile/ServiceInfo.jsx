import React from 'react'
import { useTranslation } from 'react-i18next'

const ServiceInfo = () => {

    const [t] = useTranslation()

  return (
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
            <tr>
              <td>item.name</td>
              <td>item.response_text</td>
              <td>item.response_pdf</td>
              <td>item.submit_date</td>
              <td>{0 == 0 ? t('waiting') : 0 == 1 ? t('accepted') : t('rejected')}</td>
            </tr>
      </tbody>

    </table>
  </div>
  )
}

export default ServiceInfo