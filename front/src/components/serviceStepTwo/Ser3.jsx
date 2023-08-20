import React, { useState, useEffect } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import axios from 'axios'
import { API_URL } from '../../config'
import { t } from 'i18next'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Serimg from '../../images/serIMG.png'
import { AiFillCloseCircle } from 'react-icons/ai'
import PopupErrorMsg from '../../components/error/PopupErrorMsg'
import PopupConfirmMsg from '../../components/error/PopupConfirmMsg'


const Ser3 = ({ ser }) => {
    const id = ser.service_id;
    const id2 = ser.ser_personal;
    const number = ser.files_numbers;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [error, setError] = useState('')
    const [progress, setProgress] = useState({ started: false, value: 0 })
    const [msg, setMsg] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [confirm, setConfirm] = useState(false)


    useEffect(() => {

        axios.defaults.withCredentials = true

        try {
            axios.get(`${API_URL}/auth/check`, { withCredentials: true })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                    setDisabled(true)
                    navigate('/login')
                })


        } catch (err) {
            console.log(err)
        }
    }, [])

    const [data, setData] = useState({
        payment_photo: '',
        service_id: id,
        application_id: id2,
        puplish_date: '',
        accept_date: '',
    })

    const handleCloseError = () => {
        setError('')
        setConfirm(false)
    };

    const confirmf = () => {
        setConfirm(true)
    }



    const handleSubmit = () => {
        setConfirm(false)
        axios.defaults.withCredentials = true
        console.log(data)
        if (!data.payment_photo) {
            setError(t(`service${id}-step-two-err.payment-photo`))
            return
        }
        if (!data.puplish_date) {
            setError(t(`service${id}-step-two-err.puplish_date`))
            return
        }



        const formData = new FormData();
        formData.append('payment_photo', data.payment_photo)
        if (data.accept_date !== '') {
            formData.append('accept_date', data.accept_date)
        }
        formData.append('puplish_date', data.puplish_date)
        formData.append('service_id', data.service_id)
        formData.append('application_id', data.application_id)
        formData.append('files_numbers', data.files_numbers)

        setProgress(prevState => ({ ...prevState, started: true }))
        setMsg(t('uploading'))

        try {
            axios.put(`${API_URL}/StepTwoSer2/${id}/${id2}`, formData,
                {
                    withCredentials: true, onUploadProgress: (ProgressEvent) => {
                        setDisabled(true)
                        let percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                        setProgress(prevState => ({ ...prevState, value: percentCompleted }))

                    }
                }

            )
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
            setDisabled(false)

        }

    }

    console.log(number)



    return (
        <div className="inst">
            <div className='req' style={localStorage.getItem('i18nextLng') == 'en' ? { direction: 'ltr' } : { direction: 'rtl' }}>
                <div className="inst-container">
                    <img src="../../assets/mini-logo.png" alt="" />
                    <div className="information-service_body">
                        <h1>{t(`service${id}-name`)}</h1>
                        <hr style={{ width: "60%" }} />
                        <div style={{ display: 'flex' }}>
                            <div className="img-btn">
                                <img src={Serimg} alt="" className='ImageService' />

                                <div className="progress">
                                    {progress.started && <progress max="100" value={progress.value}></progress>}
                                    {msg && <p>{msg}</p>}
                                </div>
                                <button
                                    disabled={disabled}
                                    onClick={confirmf} className='sub-now'>{t('submet')}</button>
                            </div>
                            {confirm && <PopupConfirmMsg message={t('confirm-msg')} onClose={handleCloseError} onSubmit={handleSubmit} />}
                            <div className="inputt two" >

                                <div className="select-img">
                                    <span className="title-upload">
                                        {t(`service${id}-step-two.payment-photo`)}
                                    </span>
                                    <label className='upload-image' htmlFor="upload-image0">
                                        <BiImageAdd className='img-icom' />
                                        <p>{t('click-here')}</p>
                                    </label>
                                    <input type="file"
                                        hidden
                                        id='upload-image0'
                                        name='upload-image0'
                                        onChange={(e) => { setData({ ...data, payment_photo: e.target.files[0] }) }}
                                    />
                                    {data.payment_photo &&
                                        <div>
                                            <p className='upload-image value'>{data.payment_photo.name}</p>
                                            <AiFillCloseCircle
                                                onClick={() => { setData({ ...data, payment_photo: '' }) }}
                                                style={{ color: '#ad8700', fontSize: '2rem', cursor: 'pointer' }} />

                                        </div>
                                    }
                                </div>

                                {
  Array.from(Array(number), (e, i) => (
    <React.Fragment key={i}>
      <div className="select-img">
        <span className="title-upload">
          {t(`service${id}-step-two.files_numbers`)}
        </span>
        <label className="upload-image" htmlFor={`upload-image${i}`}>
          <BiImageAdd className="img-icom" />
          <p>{t('click-here')}</p>
        </label>
        <input
          type="file"
          hidden
          id={`upload-image${i}`}
          name={`upload-image${i}`}
          onChange={(e) => {
            setData({ ...data, payment_photo: e.target.files[0] });
          }}
        />
      </div>
      <div className="select-img">
        <span className="title-upload">
          {t(`service${id}-step-two.files_numbers`)}
        </span>
        <label className="upload-image" htmlFor={`upload-image${i}`}>
          <BiImageAdd className="img-icom" />
          <p>{t('click-here')}</p>
        </label>
        <input
          type="file"
          hidden
          id={`upload-image${i}`}
          name={`upload-image${i}`}
          onChange={(e) => {
            setData({ ...data, payment_photo: e.target.files[0] });
          }}
        />
      </div>
    </React.Fragment>
  ))
}
                                <div className="select-img">
                                    <span className="title-upload">
                                        {t(`service${id}-step-two.accept-date`)}
                                    </span>
                                    <label className='upload-image' htmlFor="upload-image5">
                                    </label>
                                    <input type="date"
                                        value={data.accept_date}
                                        id=''
                                        name=''
                                        onChange={(e) => { setData({ ...data, accept_date: e.target.value }) }}
                                    />
                                </div>

                                <div className="select-img">
                                    <span className="title-upload">
                                        {t(`service${id}-step-two.puplish-date`)}
                                    </span>
                                    <label className='upload-image' htmlFor="upload-image5">
                                    </label>
                                    <input type="date"
                                        value={data.puplish_date}
                                        id=''
                                        name=''
                                        onChange={(e) => { setData({ ...data, puplish_date: e.target.value }) }}
                                    />
                                </div>

                            </div>
                            {error && <PopupErrorMsg message={error} onClose={handleCloseError} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ser3