import React, { useState, useEffect } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import './ser.css'
import axios from 'axios'
import { API_URL } from '../../config'
import { t } from 'i18next'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Serimg from '../../images/serIMG.png'
import PopupErrorMsg from '../error/PopupErrorMsg'
import PopupConfirmMsg from '../error/PopupConfirmMsg'
import { AiFillCloseCircle } from 'react-icons/ai'


const Ser2 = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [error, setError] = useState('')
    const [msg, setMsg] = useState('')
    const [progress, setProgress] = useState({ started: false, value: 0 })
    const [confirm, setConfirm] = useState(false)
    const [disabled, setDisabled] = useState(false)



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

    const [data, setData] = useState({
        level: '',
        photo_college_letter: '',
        service_id: id
    })
    const confirmf = () => {
        setConfirm(true)
    }

    const handleCloseError = () => {
        setError('')
        setConfirm(false)
    };


    const handleSubmit = () => {
        setConfirm(false)

        if (!data.level) {
            setError(t(`service${id}-step-two-err.level`))
            return
        }
        if (!data.photo_college_letter) {
            setError(t(`service${id}-step-two-err.letter`))
            return
        }



        axios.defaults.withCredentials = true
        console.log(data)
        const formData = new FormData();
        formData.append('level', data.level);
        formData.append('photo_college_letter', data.photo_college_letter);
        formData.append('service_id', data.service_id);
        setProgress(prevState => ({ ...prevState, started: true }))
        setMsg(t('uploading'))
        try {
            axios.post(`${API_URL}/payment`, formData, {
                withCredentials: true,

                onUploadProgress: (ProgressEvent) => {
                    setDisabled(true)
                    let percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                    setProgress(prevState => ({ ...prevState, value: percentCompleted }))

                }
            })
                .then((res) => {
                    console.log(res.data)
                    alert("done")
                    navigate(`/Myservices`)
                })
                .catch((err) => {
                    console.log(err.response.data.message[0])
                    setError(err.response.data.message[0])
                    if (err && err.response && err.response.data && err.response.data[0]) {
                        if (!err.response.data[0].user && err.response.data[0].user != undefined) {
                            navigate('/login')
                        }
                    }

                    setMsg(null)
                    setProgress(prevState => ({ ...prevState, started: false, value: 0 }))
                    setDisabled(false)
                })
        } catch (err) {
            console.log(err)
            console.log(err.response.data)
            setMsg(null)
            setProgress(prevState => ({ ...prevState, started: false, value: 0 }))
            setDisabled(false)
        }

    }


    const handleNext = () => {
    }

    return (
        <div className="inst">
            <div className='req' style={localStorage.getItem('i18nextLng') == 'en' ? { direction: 'ltr' } : { direction: 'rtl' }}>
                <div className="inst-container">
                    <div className="information-service">
                        <img src="../assets/mini-logo.png" alt="" />
                        <div className="information-service_body"  >
                            <h1>{t('service2-name')}</h1>
                            <hr style={{ width: "60%" }} />
                            <img src={Serimg} alt="" className='ImageServicee' width={"50%"} />

                            <div className="inputt">

                                <select
                                    name=""
                                    id=""
                                    value={data.level}
                                    onChange={(e) => { setData({ ...data, level: e.target.value }) }}
                                >
                                    <option value="">{t('level')}</option>
                                    <option value="0">{t('master')}</option>
                                    <option value="1">{t('phd')}</option>
                                </select>


                                <div className="select-img">
                                    <span className="title-upload">
                                        {t('letter')}
                                    </span>
                                    <label className='upload-image' htmlFor="upload-image">
                                        <BiImageAdd className='img-icom' />
                                        <p>{t('click-here')}</p>
                                    </label>
                                    <input type="file"
                                        hidden
                                        id='upload-image'
                                        name='upload-image'
                                        onChange={(e) => { setData({ ...data, photo_college_letter: e.target.files[0] }) }}
                                    />
                                    {data.photo_college_letter &&
                                        <div>
                                            <p className='upload-image value'>{data.photo_college_letter.name}</p>
                                            <AiFillCloseCircle
                                                onClick={() => { setData({ ...data, photo_college_letter: '' }) }}
                                                style={{ color: '#ad8700', fontSize: '2rem', cursor: 'pointer' }} />

                                        </div>
                                    }
                                </div>
                            </div>
                            {error && <PopupErrorMsg message={error} onClose={handleCloseError} />}

                            <div className="progress">
                                {progress.started && <progress max="100" value={progress.value}></progress>}
                                {msg && <p>{msg}</p>}
                            </div>
                            <button
                                disabled={disabled}
                                onClick={confirmf} className='sub-now'>{t('pay-code')}</button>
                        </div>
                        {confirm && <PopupConfirmMsg message={t('confirm-msg')} onClose={handleCloseError} onSubmit={handleSubmit} />}

                    </div>
                </div>
            </div>
            {/* <div className="inputt">
                <select
                    name=""
                    id=""
                    value={data.level}
                    onChange={(e) => { setData({ ...data, level: e.target.value }) }}
                >
                    <option value="">level</option>
                    <option value="0">master's</option>
                    <option value="1">doctor</option>
                </select>
                <div className="select-img">
                    <span className="title-upload">
                        {t('service1-step1')}
                    </span>
                    <label className='upload-image' htmlFor="upload-image">
                        <BiImageAdd className='img-icom' />
                        <p>add image</p>
                    </label>
                    <input type="file"
                        hidden
                        id='upload-image'
                        name='upload-image'
                        onChange={(e) => { setData({ ...data, photo_college_letter: e.target.files[0] }) }}
                    />
                </div>
            </div>
            <input
                type="submit"
                value="submit now"
                onClick={() => handleSubmit()}
            /> */}
        </div >
    )
}

export default Ser2