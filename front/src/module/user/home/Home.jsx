import React, { useEffect, useState } from 'react'
import Footer from '../../../components/footer/Footer'
import './home.css'
import Unav from '../../../components/userNav/Unav'
import { BiCheck } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../../config'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Coplaints from '../../../components/complains/Coplaints'
import Profit from '../../../components/profit/Profit'

const Home = () => {
    const id = "1";
    const [services, setServices] = useState([])
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {

        axios.defaults.withCredentials = true
        try {
            axios.get(`${API_URL}/user/getAllServices`, { withCredentials: true })
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

    const getTranslatedServiceName = (service) => {
        const currentLanguage = localStorage.getItem('i18nextLng');
        return currentLanguage == 'en' ? service.service_name : service.service_name_ar;
    };
    const getTranslatedServicePref = (service) => {
        const currentLanguage = localStorage.getItem('i18nextLng');
        return currentLanguage == 'en' ? service.pref : service.pref_ar;
    };

    const handleNavegate = () => {
        navigate('/allServices')
    }



    return (
        <div>
            <main>

                <div className="intro-txt" style={localStorage.getItem('i18nextLng') == 'en' ? { alignItems: 'flex-start' } : { alignItems: 'flex-end', textAlign: 'right' }}>
                    <h1>{t('helwan-uni')}</h1>
                    <h2>{t('lib')}</h2>
                    <h3 style={{ width: '50%' }}>
                        {t('info-lib')}
                    </h3>
                </div>
            </main>
            <section id='services' style={localStorage.getItem('i18nextLng') == 'en' ? { direction: 'ltr' } : { direction: 'rtl' }}>
                <h2>{t('services-title')}</h2>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '400', lineHeight: '1.5', width: '80%', textAlign: 'center', opacity: '0.8' }}>
                    {t('services-info')}
                </h2>

                <div className="services__container">
                    {Array.isArray(services) && services.map((service, index) => {
                        if (index >= 3) {
                            return null; // Skip rendering for index >= 5
                        }
                        return (
                            <article className='services' style={localStorage.getItem('i18nextLng') == 'en' ? { direction: 'ltr' } : { direction: 'rtl' }}>
                                <div className="service__head">
                                    <h1>{getTranslatedServiceName(service)}</h1>
                                </div>
                                <hr />
                                <ul className="service__list">
                                    <li className='li-article'>
                                        <BiCheck className='service__list-icon' />
                                        <p>
                                            {getTranslatedServicePref(service)}
                                        </p>
                                    </li>
                                    <li className='bttn'>
                                        <Link to={`/instructions/${service.id}`}>{t('more-det')}</Link>
                                    </li>
                                </ul>
                            </article>

                        )
                    })
                    }


                </div>
                <button className='more-Services' onClick={handleNavegate}>{t('more')}</button>

            </section>
            <hr style={{ width: '90%', margin: 'auto' }} />
            <Profit />
            <Coplaints />

            {/* <Footer /> */}
        </div>
    )
}

export default Home