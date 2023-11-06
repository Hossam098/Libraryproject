import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { Oval } from 'react-loading-icons'
import { useNavigate } from 'react-router-dom'
import PopupError from '../../../../components/error/PopupErrorMsg'
import { API_URL } from '../../../../config'
import PopupConfirmMsg from '../../../../components/error/PopupConfirmMsg'

const Send = () => {

    const [t] = useTranslation()
    const navigate = useNavigate()


    const [loading, setLoading] = useState(true)
    const [logged, setLogged] = useState(true)

    const [errors, setErrors] = useState('')
    const [data, setData] = useState([])
    const [response, setResponse] = useState('')
    const [confirm, setConfirm] = useState(false)
    const [messageSelected, setMessageSelected] = useState([])


    useEffect(() => {
        axios.defaults.withCredentials = true
        try {
            axios
                .get(`${API_URL}/manager/getusermessagesToShow`, { withCredentials: true })
                .then((res) => {
                    setData(res.data)
                    setLoading(false)
                })
                .catch((err) => {
                    if (err.status === 401) window.location.replace('/Library/login')
                    // else setErrors(t('errmsg'))
                    setLoading(false)
                })



        } catch (err) {
            console.log(err)
        }
    }, [])


    const handleReturn = () => {
        navigate('/Library/managerlogin')
    }
    const handleCloseError = () => {
        setErrors('')
        setConfirm(false)
    }



    const format = (date) => {
        const formattedDate = new Date(date).toLocaleString();
        return formattedDate;
    }

    const hanleSend = () => {
        setConfirm(false)
        if (response === '' || response.trim() === '' || response.length < 5) {
            setErrors("يجب ان يكون الرد اكثر من 5 حروف")
            setConfirm(false)
            return  
        }

        console.log(messageSelected)
        const responsesend = {
            response: response,
            message_id: messageSelected.id
        }

        axios.defaults.withCredentials = true
        try {
            axios
                .put(`${API_URL}/manager/sendresponse`, responsesend, { withCredentials: true })
                .then(() => {
                    setConfirm(false)
                    setResponse('')
                    navigate('/Library/manager/contact')
                })
                .catch((err) => {
                    if (err.status === 401) navigate('/Library/login')
                    else setErrors(t('errmsg'))
                })
        }catch (err) {
            console.log(err)
        }
    }




    return (
        <div className="inst" style={{ display: "block", direction: 'rtl' , textAlign: 'center' }}>
            {!logged && <PopupError message={t('err-Login')} onClose={handleReturn} />}
            {confirm && <PopupConfirmMsg message={t('confirm-msg-contact')} onClose={handleCloseError} onSubmit={hanleSend} />}
            {errors && <PopupError message={errors} onClose={handleCloseError} />}


            <h2 style={{ fontSize: '2.5rem', color: '#19355a', margin: '2rem auto' }}>
                {t('msg-replay')}
            </h2>
            <div className="information-service_body" >
                {loading && logged ?
                    <Oval />
                    : (
                        <div className="contact-msg"  style={localStorage.getItem('i18nextLng') === 'ar' ? { textAlign: 'right', direction: 'rtl',width: '100%' } : { textAlign: 'left', direction: 'ltr' ,width: '100%' }}>

                            {data.length > 0 && data.filter((item) => item.response == null)
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
                                        {item.response ? (
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
                                            <>
                                            <div className="contact-msg-body">
                                                <textarea
                                                    className='textAreaResponse'
                                                    placeholder='اكتب ردك هنا ...'
                                                    onChange={(e) => {
                                                        setResponse(e.target.value)
                                                    }}
                                                />
                                                <button
                                                    className="select-service-btn"
                                                    onClick={() => {
                                                        setConfirm(true)
                                                        setMessageSelected(item)
                                                    }}
                                                >
                                                    ارسال
                                                </button>
                                                </div>
                                                </>
                                        )}

                                    </React.Fragment>
                                );
                            })}
                            

                        </div>
                    )
                }
                {data.filter((item) => item.response == null).length === 0 && (
                    <div className="contact-msg" style={{ textAlign: 'center' }}>
                        <h3>{t('no-msg')}</h3>
                    </div>
                )}
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

export default Send