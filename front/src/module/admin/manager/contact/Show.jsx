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
                    if (err.status === 401) window.location.replace('/Library/managerlogin')
                    else setErrors(t('errmsg'))
                    setLoading(false)
                })



        } catch (err) {
            // console.log(err)
        }
    }, [])


    const handleReturn = () => {
        navigate('/Library/managerlogin')
    }



    const format = (date) => {
        const formattedDate = new Date(date).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        // Extract components from formattedDate
        const [, day, month, year, time] = /(\d+)\/(\d+)\/(\d+), (.+)/.exec(formattedDate);

        // Convert time to 12-hour format with AM/PM
        const [hour, minute, second] = time.split(':');
        const amPm = hour >= 12 ? 'مساءً' : 'صباحا';
        const formattedTime = `${(hour % 12) || 12}:${minute}:${second} ${amPm}`;

        // Combine components to create the final formatted date
        const formattedDateTime = `${day}/${month}/${year}, ${formattedTime}`;

        return formattedDateTime;
    };



    return (
        <div className="inst" style={{ display: "block", direction: 'rtl', textAlign: 'center' }}>
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
                                                <div className='contact-msg-body-date'>
                                                    <p >
                                                        {item.name}
                                                    </p>
                                                    <p >
                                                        {format(item.reson_date)}
                                                    </p>

                                                </div>
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
                {data.length === 0 && (
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

export default Show