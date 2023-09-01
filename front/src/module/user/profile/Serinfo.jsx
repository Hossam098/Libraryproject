import React, { useState, useEffect } from 'react'
import { API_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios'
import { saveAs } from 'file-saver'


const Serinfo = ({ service ,User}) => {

    const navigate = useNavigate();
    const { t } = useTranslation();

    console.log(User.national_id)



    const id = service.service_id;
    const id2 = service.ser_upgrade !== null ? service.ser_upgrade :
        service.ser_reg !== null ? service.ser_reg :
            service.ser_formation !== null ? service.ser_formation :
                service.ser_grant !== null ? service.ser_grant :
                    service.ser_best !== null ? service.ser_best :
                        service.ser_knowledge !== null ? service.ser_knowledge :
                            service.ser_personal !== null ? service.ser_personal :
                                service.ser_magazine !== null ? service.ser_magazine : null

    const [data, setData] = useState({})
    const downloadImage = (url) => {
        saveAs(url, 'image.jpg')
    }
    const openImage = (url) => {
        const filename = url.split('/').pop();
        const aTag = document.createElement('a');
        aTag.href = url;
        aTag.target = '_blank';
        aTag.click();
        aTag.remove();
    }


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
    const number = data.files_numbers;

    return (

        <div className='subnav-contentt'>

            {data.level && <p>{data.level}</p>}
            <div className="inputt">
                {data.submit_date &&
                    <p>{data.submit_date.slice(0, 10)}</p>
                }
                {data.edit_date &&
                    <p>{data.edit_date.slice(0, 10)}</p>
                }
                {data.req_code_date &&
                    <p>{data.req_code_date.slice(0, 10)}</p>
                }
                {data.accept_date &&
                    <p>{data.accept_date.slice(0, 10)}</p>
                }
                {data.publish_date &&
                    <p>{data.publish_date.slice(0, 10)}</p>
                }

            </div>
            <h3>attachments</h3>
            <hr style={{ width: "100%" }} />
            <div className="inputt">
                {data.photo_payment_receipt &&
                    <div>
                        {t('payment-photo')}
                        <button
                            onClick={() => { openImage(`http://localhost:5000/${User.national_id}/${data.photo_payment_receipt}`) }}
                            style={{ background: "#003C70" }} class="atch-btn">{t('open')}
                        </button>
                        <button
                            onClick={() => { downloadImage(`http://localhost:5000/${User.national_id}/${data.photo_payment_receipt}`) }}
                            style={{ background: "#AD8700" }} class="atch-btn">{t('download')}
                        </button>
                    </div>
                }
                {data.photo_college_letter &&
                    <div>
                        {t('letter')}
                        <button
                            onClick={() => { openImage(`http://localhost:5000/${User.national_id}/${data.photo_college_letter}`) }}
                            style={{ background: "#003C70" }} class="atch-btn">{t('open')}
                        </button>
                        <button
                            onClick={() => { downloadImage(`http://localhost:5000/${User.national_id}/${data.photo_college_letter}`) }}
                            style={{ background: "#AD8700" }} class="atch-btn">{t('download')}
                        </button>
                    </div>
                }
                {data.research_plan_ar_pdf &&
                    <div>
                        {t('research')}
                        <button
                            onClick={() => { openImage(`http://localhost:5000/${User.national_id}/${data.research_plan_ar_pdf}`) }}
                            style={{ background: "#003C70" }} class="atch-btn">{t('open')}
                        </button>
                        <button
                            onClick={() => { downloadImage(`http://localhost:5000/${User.national_id}/${data.research_plan_ar_pdf}`) }}
                            style={{ background: "#AD8700" }} class="atch-btn">{t('download')}
                        </button>
                    </div>
                }
                {data.research_plan_ar_word &&
                    <div>
                        {t('research-word')}
                        <button
                            onClick={() => { openImage(`http://localhost:5000/${User.national_id}/${data.research_plan_ar_word}`) }}
                            style={{ background: "#003C70" }} class="atch-btn">{t('open')}
                        </button>
                        <button
                            onClick={() => { downloadImage(`http://localhost:5000/${User.national_id}/${data.research_plan_ar_word}`) }}
                            style={{ background: "#AD8700" }} class="atch-btn">{t('download')}
                        </button>
                    </div>
                }
                {data.research_plan_en_word &&
                    <div>
                        {t('research-word-en')}
                        <button
                            onClick={() => { openImage(`http://localhost:5000/${User.national_id}/${data.research_plan_en_word}`) }}
                            style={{ background: "#003C70" }} class="atch-btn">{t('open')}
                        </button>
                        <button
                            onClick={() => { downloadImage(`http://localhost:5000/${User.national_id}/${data.research_plan_en_word}`) }}
                            style={{ background: "#AD8700" }} class="atch-btn">{t('download')}
                        </button>
                    </div>
                }
                {data.research_plan_en_pdf &&
                    <div>
                        {t('research-en')}
                        <button
                            onClick={() => { openImage(`http://localhost:5000/${User.national_id}/${data.research_plan_en_pdf}`) }}
                            style={{ background: "#003C70" }} class="atch-btn">{t('open')}
                        </button>
                        <button
                            onClick={() => { downloadImage(`http://localhost:5000/${User.national_id}/${data.research_plan_en_pdf}`) }}
                            style={{ background: "#AD8700" }} class="atch-btn">{t('download')}
                        </button>
                    </div>
                }
                {data.translation_paper &&
                    <div>
                        {t('translation')}
                        <button
                            onClick={() => { openImage(`http://localhost:5000/${User.national_id}/${data.translation_paper}`) }}
                            style={{ background: "#003C70" }} class="atch-btn">{t('open')}
                        </button>
                        <button
                            onClick={() => { downloadImage(`http://localhost:5000/${User.national_id}/${data.translation_paper}`) }}
                            style={{ background: "#AD8700" }} class="atch-btn">{t('download')}
                        </button>
                    </div>
                }
                {data.message_word_ar &&
                    <p>{data.message_word_ar}</p>
                }
                {data.message_pdf_ar && <p>{data.message_pdf_ar}</p>}
                {data.message_word_en && <p>{data.message_word_en}</p>}
                {data.message_pdf_en && <p>{data.message_pdf_en}</p>}
                {data.quote_check_form && <p>{data.quote_check_form}</p>}
                {data.files_numbers &&
                    Array.from(Array(number), (e, i) => (
                        <React.Fragment key={i}>



                            {data[`research${i + 1}_image_word`] && (
                                <div>
                                    {t(`service${id}-step-two.word${i + 1}`)}
                                    <button
                                        onClick={() => { openImage(`http://localhost:5000/${User.national_id}/${data[`research${i + 1}_image_word`]}`) }}
                                        style={{ background: "#003C70" }} class="atch-btn">{t('open')}
                                    </button>
                                    <button
                                        onClick={() => { downloadImage(`http://localhost:5000/${User.national_id}/${data[`research${i + 1}_image_word`]}`) }}
                                        style={{ background: "#AD8700" }} class="atch-btn">{t('download')}
                                    </button>
                                </div>
                            )}
                            {data[`research${i + 1}_image_pdf`] && (
                                <div>
                                    {t(`service${id}-step-two.pdf${i + 1}`)}
                                    <button
                                        onClick={() => { openImage(`http://localhost:5000/${User.national_id}/${data[`research${i + 1}_image_pdf`]}`) }}
                                        style={{ background: "#003C70" }} class="atch-btn">{t('open')}
                                    </button>
                                    <button
                                        onClick={() => { downloadImage(`http://localhost:5000/${User.national_id}/${data[`research${i + 1}_image_pdf`]}`) }}
                                        style={{ background: "#AD8700" }} class="atch-btn">{t('download')}
                                    </button>
                                </div>
                            )}
                            {data[`acceptance_letter${i + 1}`] && (
                                <div>
                                    {t(`service${id}-step-two.acceptance_letter${i + 1}`)}
                                    <button
                                        onClick={() => { openImage(`http://localhost:5000/${User.national_id}/${data[`acceptance_letter${i + 1}`]}`) }}
                                        style={{ background: "#003C70" }} class="atch-btn">{t('open')}
                                    </button>
                                    <button
                                        onClick={() => { downloadImage(`http://localhost:5000/${User.national_id}/${data[`acceptance_letter${i + 1}`]}`) }}
                                        style={{ background: "#AD8700" }} class="atch-btn">{t('download')}
                                    </button>
                                </div>
                            )}

                        </React.Fragment>
                    ))


                }
                
                
            </div>
            <hr style={{width:"100%"}}/>
                <div className='inputt'>
                    <div>
                    {t('quote_check_form')}
                    <button
                        onClick={() => { openImage(`http://localhost:5000/${User.national_id}/${data.quote_check_form}`) }}
                        style={{ background: "#003C70" }} class="atch-btn">{t('open')}
                    </button>
                    <button
                        onClick={() => { downloadImage(`http://localhost:5000/${User.national_id}/${data.quote_check_form}`) }}
                        style={{ background: "#AD8700" }} class="atch-btn">{t('download')}
                    </button>
                    </div>  
                </div>
            <h3>response</h3>    
            <hr style={{width:"100%"}}/>
                <div className="inputt ">
                {data.response_text &&
                    <p>{data.response_text}</p>
                }
                {data.response_pdf &&
                    <p>{data.response_pdf}</p>
                }
                {data.payment_code &&
                    <p>{data.payment_code}</p>
                }
                

                </div>
        </div>
    )
}

export default Serinfo