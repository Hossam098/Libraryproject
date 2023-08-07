import React, { useEffect, useState } from 'react'
import Footer from '../../../components/footer/Footer'
import './home.css'
import Unav from '../../../components/userNav/Unav'
import { BiCheck } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../../config'
import { useTranslation } from 'react-i18next';

const Home = () => {
    const id = "1";
    const [services, setServices] = useState([])
    const { t } = useTranslation();

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


    return (
        <div>
            <main>
                <Unav />
                <div className="intro-txt" style={localStorage.getItem('i18nextLng') == 'en' ? { alignItems: 'flex-start'} : { alignItems: 'flex-end' , textAlign: 'right'}}>
                    <h1>{t('lib')}</h1>
                    <h2>{t('helwan-uni')}</h2>
                    <h3 style={{width: '50%'}}>
                        {t('info-lib')}
                    </h3>
                </div>
            </main>
            <section id='services' style={localStorage.getItem('i18nextLng') == 'en' ? {direction: 'ltr'} : {direction: 'rtl'}}>
                <h2>{t('services-title')}</h2>
                

                <div className="services__container">
                    {Array.isArray(services) && services.map((service) => {
                        return (
                            <article className='services'  style={localStorage.getItem('i18nextLng') == 'en' ? {direction: 'ltr'} : {direction: 'rtl'}}>
                                <div className="service__head">
                                <h1>{getTranslatedServiceName(service)}</h1>                                
                                </div>
                                <hr />
                                <ul className="service__list">
                                    <li>
                                        <BiCheck className='service__list-icon' />
                                        <p>{getTranslatedServiceName(service)}
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
                <button className='more-Services'>{t('more')}</button>

            </section>
            <Footer />
        </div>
    )
}

export default Home