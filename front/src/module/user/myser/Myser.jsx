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
    const [reg, setReg] = useState([])
    const [formation, setFormation] = useState([])
    const [personal, setPersonal] = useState([])
    const [magazine, setMagazine] = useState([])
    const [bestMessage, setBestMessage] = useState([])


    const { t } = useTranslation();
    //هتغير ال ا بى اى ده و هتخليه يرجع الخدمات الى هيكملها
    useEffect(() => {
        axios.defaults.withCredentials = true
        try {
            axios.get(`${API_URL}/getallwaitingofregistration`, { withCredentials: true })
                .then((res) => {
                    console.log(res.data)
                    setReg(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })

            axios.get(`${API_URL}/getallwaitingofformation`, { withCredentials: true })
                .then((res) => {
                    console.log(res.data)
                    setFormation(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            axios.get(`${API_URL}/getallwaitingofpersonal`, { withCredentials: true })
                .then((res) => {
                    console.log(res.data)
                    setPersonal(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            axios.get(`${API_URL}/getallwaitingofmagazine`, { withCredentials: true })
                .then((res) => {
                    console.log(res.data)
                    setMagazine(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            axios.get(`${API_URL}/getallwaitingofbestmessage`, { withCredentials: true })
                .then((res) => {
                    console.log(res.data)
                    setBestMessage(res.data)
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

                {reg.map((service) => {
                    return (
                        <div className="inst-container">
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
                                                            <Link to={``}>
                                                                {t('wait-edit')}
                                                            </Link>
                                                        </button>
                                                    </>
                                                    : null
                                    }


                                </div>
                            </div>
                        </div>

                    )
                })}

                {formation.map((service) => {
                    return (
                        <div className="inst-container">
                            <div className="information-service">
                                <div className="information-service_body" style={{ backgroundColor: '#f9f9f9', color: '#000', width: '60%' }}>
                                    <h1 style={{ fontSize: "2rem" }}>{getTranslatedServiceName(service)}</h1>
                                    <hr style={{ width: "60%" }} />
                                    <img src={img} alt="" style={{ width: '50%' }} />

                                    {service.status == 0 ?
                                        <h2 style={{ backgroundColor: '#AD8700', color: '#000', borderRadius: '10px', padding: '10px', fontSize: '2rem', fontWeight: '500', lineHeight: '1.5', width: '80%' }}>
                                            <GiSandsOfTime />
                                            {t('service1-step3')}
                                        </h2>
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
                                                        <Link to={``}>
                                                            {t('wait-edit')}
                                                        </Link>
                                                    </button>
                                                </>
                                                : null
                                    }


                                </div>
                            </div>
                        </div>

                    )
                })}
                {personal.map((service) => {
                    return (
                        <div className="inst-container">
                            <div className="information-service">
                                <div className="information-service_body" style={{ backgroundColor: '#f9f9f9', color: '#000', width: '60%' }}>
                                    <h1 style={{ fontSize: "2rem" }}>{getTranslatedServiceName(service)}</h1>
                                    <hr style={{ width: "60%" }} />
                                    <img src={img} alt="" style={{ width: '50%' }} />

                                    {service.status == 0 ?
                                        <h2 style={{ backgroundColor: '#AD8700', color: '#000', borderRadius: '10px', padding: '10px', fontSize: '2rem', fontWeight: '500', lineHeight: '1.5', width: '80%' }}>
                                            <GiSandsOfTime />
                                            {t('service1-step3')}
                                        </h2>
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
                                                        <Link to={``}>
                                                            {t('wait-edit')}
                                                        </Link>
                                                    </button>
                                                </>
                                                : null
                                    }


                                </div>
                            </div>
                        </div>

                    )
                })}
                {magazine.map((service) => {
                    return (
                        <div className="inst-container">
                            <div className="information-service">
                                <div className="information-service_body" style={{ backgroundColor: '#f9f9f9', color: '#000', width: '60%' }}>
                                    <h1 style={{ fontSize: "2rem" }}>{getTranslatedServiceName(service)}</h1>
                                    <hr style={{ width: "60%" }} />
                                    <img src={img} alt="" style={{ width: '50%' }} />

                                    {service.status == 0 ?
                                        <h2 style={{ backgroundColor: '#AD8700', color: '#000', borderRadius: '10px', padding: '10px', fontSize: '2rem', fontWeight: '500', lineHeight: '1.5', width: '80%' }}>
                                            <GiSandsOfTime />
                                            {t('service1-step3')}
                                        </h2>
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
                                                        <Link to={``}>
                                                            {t('wait-edit')}
                                                        </Link>
                                                    </button>
                                                </>
                                                : null
                                    }


                                </div>
                            </div>
                        </div>

                    )
                })}
                {bestMessage.map((service) => {
                    return (
                        <div className="inst-container">
                            <div className="information-service">
                                <div className="information-service_body" style={{ backgroundColor: '#f9f9f9', color: '#000', width: '60%' }}>
                                    <h1 style={{ fontSize: "2rem" }}>{getTranslatedServiceName(service)}</h1>
                                    <hr style={{ width: "60%" }} />
                                    <img src={img} alt="" style={{ width: '50%' }} />

                                    {service.status == 0 ?
                                        <h2 style={{ backgroundColor: '#AD8700', color: '#000', borderRadius: '10px', padding: '10px', fontSize: '2rem', fontWeight: '500', lineHeight: '1.5', width: '80%' }}>
                                            <GiSandsOfTime />
                                            {t('service1-step3')}
                                        </h2>
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
                                                        <Link to={``}>
                                                            {t('wait-edit')}
                                                        </Link>
                                                    </button>
                                                </>
                                                : null
                                    }


                                </div>
                            </div>
                        </div>

                    )
                })}

                {/* <div className="services__container">
                    {Array.isArray(services) && services.map((service) => {
                        return (
                            <article className='services'>
                                <div className="service__head">
                                <h3>{getTranslatedServiceName(service)}</h3>                                
                                </div>
                                <ul className="service__list">
                                    <li>
                                        <BiCheck className='service__list-icon' />
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                        </p>
                                    </li>
                                    <li className='bttn'>
                                        <Link to={`/pay/${service.id}`}>enroll</Link>
                                    </li>
                                </ul>
                            </article>
                        )
                    })
                    }

                </div> */}
            </section>
            {/* <Footer /> */}
        </div>
    )
}

export default Myser
