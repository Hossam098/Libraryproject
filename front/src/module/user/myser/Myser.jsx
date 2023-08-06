import React, { useEffect, useState } from 'react'
import Footer from '../../../components/footer/Footer'
// import './home.css'
import Unav from '../../../components/userNav/Unav'
import { BiCheck } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../../config'

const Myser = () => {

    
    const id = "1";
    const [services, setServices] = useState([])
    //هتغير ال ا بى اى ده و هتخليه يرجع الخدمات الى هيكملها
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

    const getTranslatedServiceName = (service) => {
        const currentLanguage = localStorage.getItem('i18nextLng');
        return currentLanguage == 'en' ? service.service_name : service.service_name_ar;
      };

  return (
            <div>
            <Unav/>
            <section id='services'>
                <h2>services</h2>

                <div className="services__container">
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

                </div>
            </section>
            <Footer />
        </div>
  )
}

export default Myser
