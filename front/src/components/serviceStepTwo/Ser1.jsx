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


const Ser1 = () => {
    const { id } = useParams()
    const { id2 } = useParams()
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [error, setError] = useState('')
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
        payment_photo: '',
        photo_college_letter: '',
        research: '',
        research_en: '',
        research_word: '',
        research_word_en: '',
        translation: '',
        service_id: id,
        application_id: id2,
    })
    const handleCloseError = () => {
        setError('')
      };
    const handleSubmit = () => {
        axios.defaults.withCredentials = true
        console.log(data)
        if (!data.payment_photo) {
            setError(t(`service${id}-step-two-err.payment-photo`))
            return
        }
        if (!data.photo_college_letter) {
            setError(t(`service${id}-step-two-err.letter`))
            return
        }
        if (!data.research) {
            setError(t(`service${id}-step-two-err.research`))
            return
        }
        if (!data.research_word) {
            setError(t(`service${id}-step-two-err.research-word`))
            return
        }
        if (!data.translation) {
            setError(t(`service${id}-step-two-err.translation`))
            return
        }

        

        const formData = new FormData();
        formData.append('payment_photo', data.payment_photo)
        formData.append('photo_college_letter', data.photo_college_letter)
        formData.append('research', data.research)
        formData.append('research_en', data.research_en)
        formData.append('research_word', data.research_word)
        formData.append('research_word_en', data.research_word_en)
        formData.append('translation', data.translation)
        formData.append('service_id', data.service_id)
        formData.append('application_id', data.application_id)


        try {
            axios.put(`${API_URL}/StepTwoReg/${id}/${id2}`, formData, { withCredentials: true })
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
                })
        } catch (err) {
            console.log(err)
            console.log(err.response.data)

        }

    }




    return (
        <div className="inst">
            <div className='req' style={localStorage.getItem('i18nextLng') == 'en' ? { direction: 'ltr' } : { direction: 'rtl' }}>
                <div className="inst-container">
                    <img src="../assets/mini-logo.png" alt="" />
                    <div className="information-service_body">
                        <h1>{t('service1-name')}</h1>
                        <hr style={{ width: "60%" }} />
                        <div style={{ display: 'flex'}}>
                            <div className="img-btn">
                        <img src={Serimg} alt="" className='ImageService' />
                        <button onClick={handleSubmit} className='sub-now'>{t('submet')}</button>
                        </div>
                        <div className="inputt" >

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
                            <div className="select-img">
                                <span className="title-upload">
                                    {t('letter')}
                                </span>
                                <label className='upload-image' htmlFor="upload-image1">
                                    <BiImageAdd className='img-icom' />
                                    <p>{t('click-here')}</p>
                                </label>
                                <input type="file"
                                    hidden
                                    id='upload-image1'
                                    name='upload-image1'
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
                            <div className="select-img">
                                <span className="title-upload">
                                    {t(`service${id}-step-two.research`)}
                                </span>
                                <label className='upload-image' htmlFor="upload-image2">
                                    <BiImageAdd className='img-icom' />
                                    <p>{t('click-here')}</p>
                                </label>
                                <input type="file"
                                    hidden
                                    id='upload-image2'
                                    name='upload-image2'
                                    onChange={(e) => { setData({ ...data, research: e.target.files[0] })}}
                                />
                                {data.research &&
                                    <div>
                                        <p className='upload-image value'>{data.research.name}</p>
                                        <AiFillCloseCircle
                                            onClick={() => { setData({ ...data, research: '' }) }}
                                            style={{ color: '#ad8700', fontSize: '2rem', cursor: 'pointer' }} />

                                    </div>
                                }
                            </div>
                            <div className="select-img">
                                <span className="title-upload">
                                    {t(`service${id}-step-two.research-en`)}
                                </span>
                                <label className='upload-image' htmlFor="upload-image3">
                                    <BiImageAdd className='img-icom' />
                                    <p>{t('click-here')}</p>
                                </label>
                                <input type="file"
                                    hidden
                                    id='upload-image3'
                                    name='upload-image3'
                                    onChange={(e) => { setData({ ...data, research_en: e.target.files[0] })}}
                                />
                                {data.research_en &&
                                    <div>
                                        <p className='upload-image value'>{data.research_en.name}</p>
                                        <AiFillCloseCircle
                                            onClick={() => { setData({ ...data, research_en: '' }) }}
                                            style={{ color: '#ad8700', fontSize: '2rem', cursor: 'pointer' }} />

                                    </div>
                                }
                            </div>
                            <div className="select-img">
                                <span className="title-upload">
                                    {t(`service${id}-step-two.research-word`)}
                                </span>
                                <label className='upload-image' htmlFor="upload-image4">
                                    <BiImageAdd className='img-icom' />
                                    <p>{t('click-here')}</p>
                                </label>
                                <input type="file"
                                    hidden
                                    id='upload-image4'
                                    name='upload-image4'
                                    onChange={(e) => { setData({ ...data, research_word: e.target.files[0] })}}
                                />
                                {data.research_word &&
                                    <div>
                                        <p className='upload-image value'>{data.research_word.name}</p>
                                        <AiFillCloseCircle
                                            onClick={() => { setData({ ...data, research_word: '' }) }}
                                            style={{ color: '#ad8700', fontSize: '2rem', cursor: 'pointer' }} />

                                    </div>
                                }
                            </div>
                            <div className="select-img">
                                <span className="title-upload">
                                    {t(`service${id}-step-two.research-word-en`)}
                                </span>
                                <label className='upload-image' htmlFor="upload-image5">
                                    <BiImageAdd className='img-icom' />
                                    <p>{t('click-here')}</p>
                                </label>
                                <input type="file"
                                    hidden
                                    id='upload-image5'
                                    name='upload-image5'
                                    onChange={(e) => { setData({ ...data, research_word_en: e.target.files[0] })}}
                                />
                                {data.research_word_en &&
                                    <div>
                                        <p className='upload-image value'>{data.research_word_en.name}</p>
                                        <AiFillCloseCircle
                                            onClick={() => { setData({ ...data, research_word_en: '' }) }}
                                            style={{ color: '#ad8700', fontSize: '2rem', cursor: 'pointer' }} />

                                    </div>
                                }
                            </div>
                            <div className="select-img">
                                <span className="title-upload">
                                    {t(`service${id}-step-two.translation`)}
                                </span>
                                <label className='upload-image' htmlFor="upload-image6">
                                    <BiImageAdd className='img-icom' />
                                    <p>{t('click-here')}</p>
                                </label>
                                <input type="file"
                                    hidden
                                    id='upload-image6'
                                    name='upload-image6'
                                    onChange={(e) => { setData({ ...data, translation: e.target.files[0] })}}
                                />
                                {data.translation &&
                                    <div>
                                        <p className='upload-image value'>{data.translation.name}</p>
                                        <AiFillCloseCircle
                                            onClick={() => { setData({ ...data, translation: '' }) }}
                                            style={{ color: '#ad8700', fontSize: '2rem', cursor: 'pointer' }} />

                                    </div>
                                }
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

export default Ser1