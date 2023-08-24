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


const Ser4 = ({ ser }) => {
    const id = ser.service_id;
    const id2 = ser.ser_personal;
    const number = ser.files_numbers;
    const status = ser.status;
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
        if (status == 3) {
            try {
                //هنعدل الداتا
                axios.get(`${API_URL}/StepTwoRegEdit/${id}/${id2}`, { withCredentials: true })
                    .then((res) => {
                        setData({
                            // payment_photo: res.data.photo_payment_receipt,
                            // photo_college_letter: res.data.photo_college_letter,
                            // research: res.data.research_plan_ar_pdf,
                            // research_en: res.data.research_plan_en_pdf,
                            // research_word: res.data.research_plan_ar_word,
                            // research_word_en: res.data.research_plan_en_word,
                            // translation: res.data.translation_paper,
                        }
                        )
                    })
                    .catch((err) => {
                        console.log(err)

                    })


            } catch (err) {
                console.log(err)
            }
        }
    }, [])

    const [data, setData] = useState({
        payment_photo: '',
        service_id: id,
        application_id: id2,
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

        // try {
        //     axios.put(`${API_URL}/StepTwoSer2/${id}/${id2}`, formData,
        //         {
        //             withCredentials: true, onUploadProgress: (ProgressEvent) => {
        //                 setDisabled(true)
        //                 let percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
        //                 setProgress(prevState => ({ ...prevState, value: percentCompleted }))

        //             }
        //         }

        //     )
        //         .then((res) => {
        //             console.log(res.data)
        //             alert("done")
        //             navigate(`/Myservices`)

        //         })
        //         .catch((err) => {
        //             console.log(err.response.data.message[0])
        //             setError(err.response.data.message[0])
        //             if (err && err.response && err.response.data && err.response.data[0]) {
        //                 if (!err.response.data[0].user && err.response.data[0].user != undefined) {
        //                     navigate('/login')
        //                 }
        //             }
        //             setMsg(null)
        //             setProgress(prevState => ({ ...prevState, started: false, value: 0 }))
        //             setDisabled(false)
        //         })
        // } catch (err) {
        //     console.log(err)
        //     console.log(err.response.data)
        //     setDisabled(false)

        // }

    }
    const hadleEdit = () => {
        // console.log(data)
        // setConfirm(false)
        // axios.defaults.withCredentials = true
        // console.log(data)
        // if (!data.payment_photo) {
        //     setError(t(`service${id}-step-two-err.payment-photo`))
        //     return
        // }
        // if (!data.photo_college_letter) {
        //     setError(t(`service${id}-step-two-err.letter`))
        //     return
        // }
        // if (!data.research) {
        //     setError(t(`service${id}-step-two-err.research`))
        //     return
        // }
        // if (!data.research_word) {
        //     setError(t(`service${id}-step-two-err.research-word`))
        //     return
        // }
        // if (!data.translation) {
        //     setError(t(`service${id}-step-two-err.translation`))
        //     return
        // }

        // const formData = new FormData();

        // if (data.payment_photo?.name) {
        //     formData.append('payment_photo', data.payment_photo);
        //   }
        // if (data.photo_college_letter?.name) {
        //     formData.append('photo_college_letter', data.photo_college_letter)
        // }
        // if (data.research?.name) {
        //     formData.append('research', data.research)
        // }
        // if (data.research_en?.name) {
        //     formData.append('research_en', data.research_en)
        // }
        // if (data.research_word?.name) {
        //     formData.append('research_word', data.research_word)
        // }
        // if (data.research_word_en?.name) {
        //     formData.append('research_word_en', data.research_word_en)
        // }
        // if (data.translation?.name) {
        //     formData.append('translation', data.translation)
        // }
        // formData.append('service_id', id)
        // formData.append('application_id', id2)

        // setProgress(prevState => ({ ...prevState, started: true }))
        // setMsg(t('uploading'))

        // try {
        //     axios.put(`${API_URL}/StepTwoReg/${id}/${id2}`, formData,
        //         {
        //             withCredentials: true, onUploadProgress: (ProgressEvent) => {
        //                 setDisabled(true)
        //                 let percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
        //                 setProgress(prevState => ({ ...prevState, value: percentCompleted }))
        //             }
        //         }

        //     )
        //         .then((res) => {
        //             console.log(res.data)
        //             alert("done")
        //             navigate(`/`)
        //         })
        //         .catch((err) => {
        //             console.log(err.response.data.message[0])
        //             setError(err.response.data.message[0])
        //             if (err && err.response && err.response.data && err.response.data[0]) {
        //                 if (!err.response.data[0].user && err.response.data[0].user != undefined) {
        //                     navigate('/login')
        //                 }
        //             }
        //             setMsg(null)
        //             setProgress(prevState => ({ ...prevState, started: false, value: 0 }))
        //             setDisabled(false)
        //         })

        // } catch (err) {
        //     console.log(err)
        //     console.log(err.response.data)
        //     setMsg(null)
        //     setProgress(prevState => ({ ...prevState, started: false, value: 0 }))
        //     setDisabled(false)

        // }
    }

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
                            {confirm && <PopupConfirmMsg message={t('confirm-msg')} onClose={handleCloseError} onSubmit={status == 1 ? handleSubmit : hadleEdit} />}
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
                                            <p className='upload-image value'>
                                                {data.payment_photo.name?data.payment_photo.name:data.payment_photo}
                                            </p>
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
                                                    <div className="text-container">
                                                        <p className='upload-image value'>
                                                            {words[`word${i + 1}`].name?words[`word${i + 1}`].name:words[`word${i + 1}`]}
                                                        </p>
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
                                                    <div className="text-container">
                                                        <p className='upload-image value'>
                                                            {pdfs[`pdf${i + 1}`].name?pdfs[`pdf${i + 1}`].name:pdfs[`pdf${i + 1}`]}
                                                        </p>
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

                               

                            </div>
                            {error && <PopupErrorMsg message={error} onClose={handleCloseError} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ser4