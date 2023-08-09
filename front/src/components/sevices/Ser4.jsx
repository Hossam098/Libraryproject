import React, { useState ,useEffect} from 'react'
import { BiImageAdd } from 'react-icons/bi'
import './ser.css'
import axios from 'axios'
import { API_URL } from '../../config'
import { t } from 'i18next'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Serimg from '../../images/serIMG.png'


const Ser4 = () => {
    const { id } = useParams()
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
        photo_college_letter: '',
        service_id: id
    })

    const handleSubmit = () => {
        axios.defaults.withCredentials = true
        console.log(data)
        const formData = new FormData();
        formData.append('photo_college_letter', data.photo_college_letter);
        formData.append('service_id', data.service_id);

        try {
            axios.post(`${API_URL}/payment`, formData, { withCredentials: true })
                .then((res) => {
                    console.log(res.data)
                    alert("done")
                    navigate(`/pay/${id}`)
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


    const handleNext = () => {
    }

    return (
        <div className='req' style={localStorage.getItem('i18nextLng') == 'en' ? { direction: 'ltr' } : { direction: 'rtl' }}>
            <div className="inst-container">
                <div className="information-service">
                    <img src="../assets/mini-logo.png" alt="" />
                    <div className="information-service_body">
                        <h1>{t('service4-name')}</h1>
                        <hr style={{ width: "60%" }} />
                        <img src={Serimg} alt="" className='ImageService'/>

                        <div className="inputt" style={{ gridTemplateColumns: '1fr' }}>

                            <div className="select-img">
                                <span className="title-upload">
                                    Graduate letter
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
                                {data.photo_college_letter && <p className='upload-image value'>{data.photo_college_letter.name}</p>}
                            </div>
                        </div>
                        {error != '' && <h2 style={{ color: '#AD8700' }}>
                            **** {error} ****
                        </h2>
                        }

                        <button onClick={handleSubmit} className='sub-now'>{t('pay-code')}</button>
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
                        Graduate letter
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
        </div>
    )
}

export default Ser4