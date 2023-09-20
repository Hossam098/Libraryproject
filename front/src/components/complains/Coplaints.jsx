import React from 'react'
import './coplains.css'
import QR from '../../images/QR.png'
import { useTranslation } from 'react-i18next'
const Coplaints = () => {

    const { t } = useTranslation()

    return (
        <div className='contnaier' style={localStorage.getItem('i18nextLng') === 'ar' ? { direction: 'rtl', textAlign: "right" } : { direction: 'ltr', textAlign: "left" }}>
            <h2>
                {t('complains.title')}
            </h2>
            <div className="flex-row">
                <p>
                    {t('complains.p')}
                </p>
                <button className="c-button">
                    {t('click-here')}
                </button>
            </div>
            <img src={QR} alt="" className='QR' />
        </div>
    )
}

export default Coplaints