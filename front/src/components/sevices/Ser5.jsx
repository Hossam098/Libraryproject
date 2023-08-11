import React, { useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import './ser.css'
import axios from 'axios'
import { API_URL } from '../../config'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const Ser5 = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const { t } = useTranslation();

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
        <div>
        <div className='req'>
            <div className="inputt">
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
            />
        </div>
        </div>
    )
}

export default Ser5