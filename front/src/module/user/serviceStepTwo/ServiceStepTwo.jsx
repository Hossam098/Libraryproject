import React ,{useEffect}from 'react'
import { useParams } from 'react-router-dom';
import Unav from '../../../components/userNav/Unav';
import Footer from '../../../components/footer/Footer';
import Ser1 from '../../../components/serviceStepTwo/Ser1';
import Ser2 from '../../../components/serviceStepTwo/Ser2';
import Ser3 from '../../../components/serviceStepTwo/Ser3';
import Ser4 from '../../../components/serviceStepTwo/Ser4';
import Ser5 from '../../../components/serviceStepTwo/Ser5';
import Ser6 from '../../../components/serviceStepTwo/Ser6';
import Ser7 from '../../../components/serviceStepTwo/Ser7';
import Ser8 from '../../../components/serviceStepTwo/Ser8';
import axios from 'axios';
import { API_URL } from '../../../config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Serimg from '../../../images/serIMG.png'

import './serviceStepTwo.css'



const ServiceStepTwo = () => {
    const { id } = useParams();
    const {id2} = useParams();
    const navigate = useNavigate();

    console.log(id , id2)

    useEffect(() => {
        axios.defaults.withCredentials = true

        try {
            axios.get(`${API_URL}/auth/check`, { withCredentials: true })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                    navigate('/login')
                })

        } catch (err) {
            console.log(err)
        }
    }, [])

    const serviceStepTwo = (id) => {
        switch (id) {
            case '1':
                return <Ser1 />;
            case '2':
                return <Ser2 />;
            case '3':
                return <Ser3 />;
            case '4':
                return <Ser4 />;
            case '5':
                return <Ser5 />;
            case '6':
                return <Ser6 />;
            case '7':
                return <Ser7 />;
            case '8':
                return <Ser8 />;


            default:
                return <h1>Wrong Choice</h1>;
        }
    }

    return (
        <div style={{backgroundColor:'#fff'}}>
            
            {/* <div className="Cont-Serv"> */}
                {/* <img src={Serimg} alt="" className='ImageserviceStepTwo'/> */}
                {serviceStepTwo(id)}
            {/* </div> */}
            {/* <Footer /> */}
        </div>
    )
}

export default ServiceStepTwo