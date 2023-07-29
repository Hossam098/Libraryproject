import React from 'react'
import './contact.css'
import { useTranslation } from 'react-i18next';
import Image from '../../images/contact_us.jpg'

const Contact = () => {
  const [t, i18n] = useTranslation();
  return (
    <>
      <section className="contact-container">
        
          <div className="image">
            <img src={Image} alt="" />
          </div>
          <div className="content">
            <h2>{t('contact')}</h2>
            <div className="contacts" id="#ContactUs" style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}>
              {/* <h4>   {t('con-ul-1')} </h4> */}
              
            </div>
          </div>
        
      </section>
    </>
  )
}

export default Contact