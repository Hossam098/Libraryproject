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


const Ser7 = ({ser}) => {
    const { id } = useParams()
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [error, setError] = useState('')
    const [msg, setMsg] = useState('')
    const [progress, setProgress] = useState({ started: false, value: 0 })
    const [confirm, setConfirm] = useState(false)
    const [disabled, setDisabled] = useState(false)
    let id2 = 0
    let status = 0
    if (id === undefined) {
        id = ser.service_id;
        id2 = ser.ser_reg;
        status = ser.status;
    }
    const [data, setData] = useState({
        level: '',
        decision: '',
        pdf: '',
        word: '',
        service_id: id
    })

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



    const handleCloseError = () => {
        setError('')
        setConfirm(false)
    };
    const handleSubmit = () => {
        if (status !== 4) {
        setConfirm(false)
        if (!data.level) {
            setError(t(`service2-step-two-err.level`))
            return
        }
        if (!data.decision) {
            setError(t(`service7-step4.3-err`))
            return
        }

        if (!data.pdf) {
            setError(t(`service7-step4.2-err`))
            return
        }
        if (!data.word) {
            setError(t(`service7-step4.1-err`))
            return
        }

        axios.defaults.withCredentials = true
        console.log(data)
        const formData = new FormData();
        formData.append('level', data.level);
        formData.append('decision', data.decision);
        formData.append('pdf', data.pdf);
        formData.append('word', data.word);

        setProgress(prevState => ({ ...prevState, started: true }))
        setMsg(t('uploading'))

        try {
            axios.post(`${API_URL}/StepTwoSer7`, formData, {
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
    else if (status == 4) {
        
        setConfirm(false)
        if (!data.level) {
            setError(t(`service2-step-two-err.level`))
            return
        }
        if (!data.decision) {
            setError(t(`service7-step4.3-err`))
            return
        }

        if (!data.pdf) {
            setError(t(`service7-step4.2-err`))
            return
        }
        if (!data.word) {
            setError(t(`service7-step4.1-err`))
            return
        }
       
        axios.defaults.withCredentials = true
        console.log(data)
        const formData = new FormData();
        formData.append('level', data.level);
        if (data.decision?.name) {
            formData.append('decision', data.decision)
        }
        if (data.pdf?.name) {
            formData.append('pdf', data.pdf)
        }
        if (data.word?.name) {
            formData.append('word', data.word)
        }

        setProgress(prevState => ({ ...prevState, started: true }))
        setMsg(t('uploading'))

        try {
            axios.put(`${API_URL}/paymentedit/${id}/${id2}`, formData, {
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
    }



    const confirmf = () => {
        setConfirm(true)
    }


    return (
        <div className="inst">
            <div className='req' style={localStorage.getItem('i18nextLng') == 'en' ? { direction: 'ltr' } : { direction: 'rtl' }}>
                <div className="inst-container">
                    <img src="../assets/mini-logo.png" alt="" />
                    <div className="information-service_body" >
                        <h1>{t('service1-name')}</h1>
                        <hr style={{ width: "60%" }} />
                        <img src={Serimg} alt="" className='ImageServicee' width={'50%'} />

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
                                {t('service7-step3')}
                                </span>
                                <label className='upload-image' htmlFor="upload-image1">
                                    <BiImageAdd className='img-icom' />
                                    <p>{t('click-here')}</p>
                                </label>
                                <input type="file"
                                    hidden
                                    id='upload-image1'
                                    name='upload-image1'
                                    onChange={(e) => { setData({ ...data, decision: e.target.files[0] }) }}
                                />
                                {data.decision &&
                                    <div className="text-container">
                                        <p className='upload-image value'>
                                            {data.decision.name?data.decision.name:data.decision}
                                        </p>
                                        <button className='upload-image openPdf' 
                                            onClick={() => {
                                                if (data.decision.name) {
                                                    return window.open(URL.createObjectURL(data.decision))
                                                } else {
                                                    return window.open(`http://localhost:5000/${ser.national_id}/${data.decision}`)
                                                }
                                            }}
                                            >{t('open')}</button>
                                        <AiFillCloseCircle
                                            onClick={() => { setData({ ...data, decision: '' }) }}
                                            style={{ color: '#ad8700', fontSize: '2rem', cursor: 'pointer' }} />

                                    </div>
                                }
                            </div>

                            <div className="select-img">
                                <span className="title-upload">
                                    {t('service7-step4.1')}
                                </span>
                                <label className='upload-image' htmlFor="upload-image">
                                    <BiImageAdd className='img-icom' />
                                    <p>{t('click-here')}</p>
                                </label>
                                <input type="file"
                                    hidden
                                    id='upload-image'
                                    name='upload-image'
                                    onChange={(e) => { setData({ ...data, word: e.target.files[0] }) }}
                                />
                                {data.word &&
                                    <div className="text-container">
                                        <p className='upload-image value'>
                                            {data.word.name?data.word.name:data.word}
                                        </p>
                                        <button className='upload-image openPdf' 
                                            onClick={() => {
                                                if (data.word.name) {
                                                    return window.open(URL.createObjectURL(data.word))
                                                } else {
                                                    return window.open(`http://localhost:5000/${ser.national_id}/${data.word}`)
                                                }
                                            }}
                                            >{t('open')}</button>
                                        <AiFillCloseCircle
                                            onClick={() => { setData({ ...data, word: '' }) }}
                                            style={{ color: '#ad8700', fontSize: '2rem', cursor: 'pointer' }} />

                                    </div>
                                }
                            </div>
                            <div className="select-img">
                                <span className="title-upload">
                                    {t('service7-step4.2')}
                                </span>
                                <label className='upload-image' htmlFor="upload-image2">
                                    <BiImageAdd className='img-icom' />
                                    <p>{t('click-here')}</p>
                                </label>
                                <input type="file"
                                    hidden
                                    id='upload-image2'
                                    name='upload-image2'
                                    onChange={(e) => { setData({ ...data, pdf: e.target.files[0] }) }}
                                />
                                {data.pdf &&
                                    <div className="text-container">
                                        <p className='upload-image value'>
                                            {data.pdf.name?data.pdf.name:data.pdf}
                                        </p>
                                        <button className='upload-image openPdf' 
                                            onClick={() => {
                                                if (data.pdf.name) {
                                                    return window.open(URL.createObjectURL(data.pdf))
                                                } else {
                                                    return window.open(`http://localhost:5000/${ser.national_id}/${data.pdf}`)
                                                }
                                            }}
                                            >{t('open')}</button>
                                        <AiFillCloseCircle
                                            onClick={() => { setData({ ...data, pdf: '' }) }}
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
    )
}

export default Ser7