import React, { useState, useEffect } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { BsFilePdf, BsFileEarmarkWord } from 'react-icons/bs'
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
    const [words, setwords] = useState({
        word1: "",
        word2: "",
        word3: "",
        word4: "",
        word5: "",
        word6: "",
        word7: "",
        word8: "",
        word9: "",
        word10: ""
    })
    const [pdfs, setPdfs] = useState({
        pdf1: "",
        pdf2: "",
        pdf3: "",
        pdf4: "",
        pdf5: "",
        pdf6: "",
        pdf7: "",
        pdf8: "",
        pdf9: "",
        pdf10: ""
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
        const validExtensions = /\.(doc|docx)$/i; // Regular expression pattern for valid file extensions
        const validExtensions2 = /\.(pdf)$/i; // Regular expression pattern for valid file extensions

        for (let i = 0; i < number; i++) {
            const file = words[`word${i + 1}`];

            if (!file) {
                setError(t(`service${id}-step-two-err.word${i + 1}`));
                return;
            }

            const fileName = file.name;
            if (!validExtensions.test(fileName)) {
                setError(t(`service${id}-step-two-err.word${i + 1}`));
                return;
            }
        }
        for (let i = 0; i < number; i++) {
            const file = pdfs[`pdf${i + 1}`];

            if (!file) {
                setError(t(`service${id}-step-two-err.pdf${i + 1}`))
                return
            }
            const fileName = file.name;
            if (!validExtensions2.test(fileName)) {
                setError(t(`service${id}-step-two-err.pdf${i + 1}`))
                return
            }
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

        formData.append('word1', words.word1)
        formData.append('word2', words.word2)
        formData.append('word3', words.word3)
        formData.append('word4', words.word4)
        formData.append('word5', words.word5)
        formData.append('word6', words.word6)
        formData.append('word8', words.word7)
        formData.append('word9', words.word8)
        formData.append('word9', words.word9)
        formData.append('word10', words.word10)


        formData.append('pdf1', pdfs.pdf1)
        formData.append('pdf2', pdfs.pdf2)
        formData.append('pdf3', pdfs.pdf3)
        formData.append('pdf4', pdfs.pdf4)
        formData.append('pdf5', pdfs.pdf5)
        formData.append('pdf6', pdfs.pdf6)
        formData.append('pdf8', pdfs.pdf7)
        formData.append('pdf9', pdfs.pdf8)
        formData.append('pdf9', pdfs.pdf9)
        formData.append('pdf10', pdfs.pdf10)


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

    // const renderInputs = () => {
    //     const arr = [];
    //     for (let i = 0; i < number; i++) {
    //       arr.push(
    //         <div className="select-img">
    //           <span className="title-upload">
    //             {`img ${i + 1}`}
    //           </span>
    //           <label className="upload-image" htmlFor={`word${i}`}>
    //             <BiImageAdd className="img-icom" />
    //             <p>{t('click-here')}</p>
    //           </label>
    //           <input
    //             type="file"
    //             hidden
    //             id={`word${i}`}
    //             name={`word${i}`}
    //             onChange={(e) => {
    //               setwords({
    //                 ...words,
    //                 [`word${i + 1}`]: e.target.files[0]
    //               });
    //               console.log(words)
    //             }}
    //           />
    //         </div>
    //       );
    //     }
    //     return arr;
    //   };


    return (
        <div className="inst">
            <div className='req' style={localStorage.getItem('i18nextLng') == 'en' ? { direction: 'ltr' } : { direction: 'rtl' }}>
                <div className="inst-container">
                    <img src="../../assets/mini-logo.png" alt="" />
                    <div className="information-service_body">
                        <h1>{t(`service${id}-name`)}</h1>
                        <hr style={{ width: "60%" }} />
                        <div className='data-c'>
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
                            <div className="inputt " >

                                <div className="select-img two">
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
                                                    {t(`service${id}-step-two.word${i + 1}`)}
                                                </span>
                                                <label className="upload-image" htmlFor={`word${i}`}>
                                                    <BsFileEarmarkWord className="img-icom" />
                                                    <p>{t('click-here')}</p>
                                                </label>
                                                <input
                                                    type="file"
                                                    hidden
                                                    id={`word${i}`}
                                                    name={`word${i}`}
                                                    onChange={(e) => {
                                                        setwords({ ...words, [`word${i + 1}`]: e.target.files[0] });

                                                    }}
                                                />

                                                {words[`word${i + 1}`] && (
                                                    <div>
                                                        <p className='upload-image value'>{words[`word${i + 1}`].name}</p>
                                                        <AiFillCloseCircle
                                                            onClick={() => { setwords({ ...words, [`word${i + 1}`]: '' }) }}
                                                            style={{ color: '#ad8700', fontSize: '2rem', cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="select-img">
                                                <span className="title-upload">
                                                    {t(`service${id}-step-two.pdf${i + 1}`)}
                                                </span>
                                                <label className="upload-image" htmlFor={`pdf${i}`}>
                                                    <BsFilePdf className="img-icom" />
                                                    <p>{t('click-here')}</p>
                                                </label>
                                                <input
                                                    type="file"
                                                    hidden
                                                    id={`pdf${i}`}
                                                    name={`pdf${i}`}
                                                    onChange={(e) => {
                                                        setPdfs({ ...pdfs, [`pdf${i + 1}`]: e.target.files[0] });

                                                    }}
                                                />

                                                {pdfs[`pdf${i + 1}`] && (
                                                    <div>
                                                        <p className='upload-image value'>{pdfs[`pdf${i + 1}`].name}</p>
                                                        <AiFillCloseCircle
                                                            onClick={() => { setPdfs({ ...pdfs, [`pdf${i + 1}`]: '' }) }}
                                                            style={{ color: '#ad8700', fontSize: '2rem', cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                )}
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