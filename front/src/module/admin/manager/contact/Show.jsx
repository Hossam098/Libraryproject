import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { Oval } from 'react-loading-icons'
import { useNavigate } from 'react-router-dom'
import PopupError from '../../../../components/error/PopupError'
import { API_URL } from '../../../../config'


const Show = () => {

    const [t] = useTranslation()
    const navigate = useNavigate()


    const [loading, setLoading] = useState(true)
    const [logged, setLogged] = useState(true)

    const [errors, setErrors] = useState('')
    const [data, setData] = useState([])


    useEffect(() => {
        axios.defaults.withCredentials = true
        try {
            axios
                .get(`${API_URL}/manager/getusermessages`, { withCredentials: true })
                .then((res) => {
                    setData(res.data)
                    setLoading(false)
                })
                .catch((err) => {
                    if (err.status === 401) navigate('/Library/login')
                    else setErrors(t('errmsg'))
                })



        } catch (err) {
            console.log(err)
        }
    }, [])


    const handleReturn = () => {
        navigate('/Library/managerlogin')
    }



    const format = (date) => {
        const resonDate = "2023-10-06T20:32:29.000Z";
        const formattedDate = new Date(date).toLocaleString();
        return formattedDate;
    }



    return (
        <div className="inst" style={{ display: "block", direction: 'rtl' }}>
            {!logged && <PopupError message={t('err-Login')} onClose={handleReturn} />}


            <h2 style={{ fontSize: '2.5rem', color: '#19355a', margin: '2rem auto', textAlign: 'center' }}>
                {t('msg-replay')}
            </h2>
            <div className="information-service_body" >
                {loading && logged ?
                    <Oval />
                    : (
                        <div className="contact-msg" style={localStorage.getItem('i18nextLng') === 'ar' ? { textAlign: 'right', direction: 'rtl', width: '100%' } : { textAlign: 'left', direction: 'ltr', width: '100%' }}>

                            {data.length > 0 && data.filter((item) => item.response !== null)
                                .map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div className="contact-msg-head" style={{ textAlign: 'center' }}>
                                                <h3>{item.service_name_ar}</h3>
                                            </div>
                                            <hr />
                                            <div className="contact-msg-body">
                                                <h2>- {item.message}</h2>
                                                <p style={localStorage.getItem('i18nextLng') === 'ar' ? { textAlign: 'left', direction: 'ltr' } : { textAlign: 'right', direction: 'rtl' }}>
                                                    {format(item.reson_date)}
                                                </p>
                                            </div>
                                            {item.response && (
                                                <React.Fragment>
                                                    <div className="contact-msg-body">
                                                        <h2 style={{ color: '#ad8700' }}>
                                                            ={'>'} {item.response}
                                                        </h2>
                                                        <div className='contact-msg-body-date'>
                                                            <p >
                                                                {item.mname}
                                                            </p>
                                                            <p >
                                                                {format(item.response_date)}
                                                            </p>

                                                        </div>
                                                    </div>
                                                    {/* <hr /> */}
                                                </React.Fragment>
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
                        navigate('/Library/manager/contact')
                    }}
                >
                    {t('returnTo')}
                </button>
            </div>


        </div>
    )




}

export default Show