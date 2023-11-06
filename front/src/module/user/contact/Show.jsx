import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { Oval } from 'react-loading-icons'
import { useNavigate } from 'react-router-dom'
import PopupErrorMsg from '../../../components/error/PopupErrorMsg'
import PopupError from '../../../components/error/PopupError'
import { API_URL } from '../../../config'



const Show = () => {

    const [t] = useTranslation()
    const navigate = useNavigate()


    const [loading, setLoading] = useState(false)
    const [logged, setLogged] = useState(true)

    const [errors, setErrors] = useState('')
    const [data, setData] = useState([])


    useEffect(() => {
        axios.defaults.withCredentials = true
        try {
            axios
                .get(`${API_URL}/auth/check`, { withCredentials: true })
                .then((res) => {
                    setLogged(true)
                })
                .catch((err) => {
                    console.log(err);
                    setLogged(false)

                });

            axios
                .get(`${API_URL}/user/getusermessages`, { withCredentials: true })
                .then((res) => {
                    setData(res.data)
                    setLoading(true)
                })
                .catch((err) => {
                    if (err.status === 401) window.location.replace('/Library/login')
                    else setErrors(t('errmsg'))
                    setLoading(false)
                })



        } catch (err) {
            console.log(err)
        }
    }, [])


    const handleReturn = () => {
        navigate('/Library/login')
    }



    const format = (date) => {
        const resonDate = "2023-10-06T20:32:29.000Z";
        const formattedDate = new Date(date).toLocaleString();
        return formattedDate;
    }



    return (
        <div className="inst" style={localStorage.getItem('i18nextLng') === 'ar' ? { textAlign: 'right', direction: 'rtl' } : { textAlign: 'left', direction: 'ltr' }}>
            {!logged && <PopupError message={t('err-Login')} onClose={handleReturn} />}


            <h2 style={{ fontSize: '2.5rem', color: '#19355a', margin: '2rem auto' }}>
                {t('msg-replay')}
            </h2>
            <div className="information-service_body" >
                {!loading && !logged ?
                    <Oval />
                    : (
                        <div className="contact-msg" style={localStorage.getItem('i18nextLng') === 'ar' ? { textAlign: 'right', direction: 'rtl', width: '100%' } : { textAlign: 'left', direction: 'ltr', width: '100%' }}>

                            {data.length > 0 && data.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <div className="contact-msg-head" style={{ textAlign: 'center' ,marginTop:'1rem'}}>
                                            <h3>{item.service_name_ar}</h3>
                                            <h3 style={{color : "#ad8700"}}>{item.reson == 1 ? t('reson1') : item.reson == 2 ? t('reson2') : null}</h3>
                                        </div>
                                        <hr />
                                        <div className="contact-msg-body">
                                            <h2>- {item.message}</h2>
                                            <p style={localStorage.getItem('i18nextLng') === 'ar' ? { textAlign: 'left', direction: 'ltr' } : { textAlign: 'right', direction: 'rtl' }}>
                                                {format(item.reson_date)}
                                            </p>
                                        </div>
                                        {item.response  ? (
                                            <React.Fragment>
                                                <div className="contact-msg-body">
                                                    <h2 style={{ color: '#ad8700' }}>
                                                        ={'>'} {item.response}
                                                    </h2>
                                                    <p style={localStorage.getItem('i18nextLng') === 'ar' ? { textAlign: 'left', direction: 'ltr' } : { textAlign: 'right', direction: 'rtl' }}>
                                                        {format(item.response_date)}
                                                    </p>
                                                </div>
                                                {/* <hr /> */}
                                            </React.Fragment>
                                        ) : (
                                        <h2 style={{ color: '#ad8700' }}>
                                            {t('msg-not-replay')}
                                        </h2>
                                        )}
                                    </React.Fragment>
                                );
                            })}


                        </div>
                    )
                }
                
                <button
                    className='select-service-btn'
                    style={{ backgroundColor: '#fff', color: '#19355a' }}
                    onClick={() => {
                        navigate('/Library/contact')
                    }}
                >
                    {t('returnTo')}
                </button>
            </div>


        </div>
    )




}

export default Show