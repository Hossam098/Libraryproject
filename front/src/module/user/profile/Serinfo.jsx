import React, { useState, useEffect } from 'react'
import { API_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios'


const Serinfo = ({ service }) => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    

    const id = service.service_id;
    const id2 = service.ser_upgrade !== null ? service.ser_upgrade : 
    service.ser_reg !== null? service.ser_reg :
    service.ser_formation !== null? service.ser_formation :
    service.ser_grant !== null? service.ser_grant :
    service.ser_best !== null? service.ser_best :
    service.ser_knowledge !== null? service.ser_knowledge :
    service.ser_personal !== null? service.ser_personal :
    service.ser_magazine!== null? service.ser_magazine: null

    const [data, setData] = useState({})


    useEffect(() => {

        axios.defaults.withCredentials = true

        try {
            axios.get(`${API_URL}/auth/check`, { withCredentials: true })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    // console.log(err)
                    navigate('/login')
                })


        } catch (err) {
            // console.log(err)
        }


        try {
            axios.get(`${API_URL}/StepTwoRegEdit/${id}/${id2}`, { withCredentials: true })
                .then((res) => {
                    setData(res.data)
                })
                .catch((err) => {
                    // console.log(err)

                })
        } catch (err) {
            console.log(err)
        }
console.log(data)


    }, [id])

    return (
        <div className='subnav-contentt'>
            {data.level&&<p>{data.level}</p>}
            {data.submit_date&&<p>{data.submit_date}</p>}
            {data.edit_date&&<p>{data.edit_date}</p>}
            {data.req_code_date&&<p>{data.req_code_date}</p>}
            {data.photo_payment_receipt&&<p>{data.photo_payment_receipt}</p>}
            {data.photo_college_letter&&<p>{data.photo_college_letter}</p>}
            {data.research_plan_ar_pdf&&<p>{data.research_plan_ar_pdf}</p>}
            {data.research_plan_ar_word&&<p>{data.research_plan_ar_word}</p>}
            {data.research_plan_en_word&&<p>{data.research_plan_en_word}</p>}
            {data.research_plan_en_pdf&&<p>{data.research_plan_en_pdf}</p>}
            {data.translation_paper&&<p>{data.translation_paper}</p>}
            {data.message_word_ar&&<p>{data.message_word_ar}</p>}
            {data.message_pdf_ar&&<p>{data.message_pdf_ar}</p>}
            {data.message_word_en&&<p>{data.message_word_en}</p>}
            {data.message_pdf_en&&<p>{data.message_pdf_en}</p>}
            {data.quote_check_form&&<p>{data.quote_check_form}</p>}
        </div>
    )
}

export default Serinfo