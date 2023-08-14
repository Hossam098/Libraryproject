import React, { useEffect, useState } from 'react'
import Footer from '../../../components/footer/Footer'
import './Myser.css'
import Unav from '../../../components/userNav/Unav'
import { BiCheck } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../../config'
import { useTranslation } from 'react-i18next'
import img from '../../../images/Email campaign-amico 1.png'
import codeIMG from '../../../images/Personal site-amico 2.png'
import { GiSandsOfTime } from 'react-icons/gi'


const Myser = () => {


    const id = "1";
    const [services, setServices] = useState([])

    const { t } = useTranslation();
    useEffect(() => {
        axios.defaults.withCredentials = true
        try {
            axios.get(`${API_URL}/getallwaiting`, { withCredentials: true })
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

            <section id='services'>
                <h2>{t("waiting-list")}</h2>
                {
                    services.map((service) => {
                        return(
                        <div className="inst"><div className="inst-container">
                            <div className="information-service">
                                <div className="information-service_body" style={{ backgroundColor: '#f9f9f9', color: '#000', width: '60%' }}>
                                    <h1 style={{ fontSize: "2rem" }}>{getTranslatedServiceName(service)}</h1>
                                    <hr style={{ width: "60%" }} />
                                    <img src={service.status == 1 ? codeIMG : img} alt="" style={{ width: '50%' }} />

                                    {service.status == 0 ?
                                        <h2 style={{ backgroundColor: '#AD8700', color: '#000', borderRadius: '10px', padding: '10px', fontSize: '2rem', fontWeight: '500', lineHeight: '1.5', width: '80%' }}>
                                            <GiSandsOfTime />
                                            {t('service1-step3')}
                                        </h2>
                                        : service.status == 1 ?
                                            <>
                                                <div className="contiue">
                                                    <span>payment code </span>
                                                    <div className="code wait-txt">
                                                        {service.payment_code}
                                                    </div>
                                                    <Link to className="waitbtn-edit">cotinue</Link>
                                                </div>
                                            </>
                                            : service.status == 2 ?
                                                <h2 style={{ backgroundColor: '#AD8700', color: '#000', borderRadius: '10px', padding: '10px', fontSize: '2rem', fontWeight: '500', lineHeight: '1.5', width: '80%' }}>
                                                    <GiSandsOfTime />
                                                    {t('wait-res')}
                                                </h2>
                                                : service.status == 3 ?
                                                    <>
                                                        <h2 className='wait-txt'>
                                                            <GiSandsOfTime />
                                                            {service.response_text}
                                                        </h2>
                                                        <button className="waitbtn-edit">
                                                            <Link to={``} style={{ color: '#fff' }}>
                                                                {t('wait-edit')}
                                                            </Link>
                                                        </button>
                                                    </>
                                                    : null}
                                </div>
                            </div>
                        </div>
                        </div>)
                    })
                }

            </section>
            {/* <Footer /> */}
        </div>
    )
}

export default Myser

