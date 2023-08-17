import React from 'react'
import './about.css'
import Coplaints from '../../../components/complains/Coplaints'
import { useTranslation } from 'react-i18next'

const About = () => {

  const { t } = useTranslation()


  return (
    <div className='about'>
      <div className='intro-text'>
        <h1>{t('aboutus.title')}</h1>
        <h3>{t('aboutus.h3')}</h3>
        <h4>{t('aboutus.p')}</h4>
      </div>
      <section className='grid-3'>
        <div className="about-cont"
          style={localStorage.getItem('i18nextLng') === 'ar' ? { direction: 'rtl' ,textAlign:"right"} : { direction: 'ltr' ,textAlign:"left"}}
        >
          <span></span>
          <h2>{t('aboutus.us')}</h2>
          <p>{t('aboutus.us-p')}</p>
        </div>
        <div className="about-cont"
          style={localStorage.getItem('i18nextLng') === 'ar' ? { direction: 'rtl' ,textAlign:"right"} : { direction: 'ltr' ,textAlign:"left"}}
        >
          <span></span>
          <h2>{t('aboutus.our-message')}</h2>
          <p>
            <span>{t('aboutus.our-vision')}:</span>
            {t('aboutus.our-vision-p')}
          </p>
          <p>
            <span>{t('aboutus.our-message')} : </span>
            {t('aboutus.our-message-p')}
          </p>
        </div>
        <div className="about-cont"
          style={localStorage.getItem('i18nextLng') === 'ar' ? { direction: 'rtl' ,textAlign:"right"} : { direction: 'ltr' ,textAlign:"left"}}
        >
          <span></span>
          <h2>{t('aboutus.our-goals')}</h2>
          <ol>
            <li>
              {t('aboutus.our-goals-1')}
            </li>
            <li>
              {t('aboutus.our-goals-2')}
            </li>
            <li>
              {t('aboutus.our-goals-3')}
            </li>
            <li>
              {t('aboutus.our-goals-4')}
            </li>
            <li>
              {t('aboutus.our-goals-5')}
            </li>
            <li>
              {t('aboutus.our-goals-6')}
            </li>
            <li>
              {t('aboutus.our-goals-7')}
            </li>
            <li>
              {t('aboutus.our-goals-8')}
            </li>
            <li>
              {t('aboutus.our-goals-9')}
            </li>
          </ol>
        </div>
      </section>
      <Coplaints/>

    </div>
  )
}

export default About