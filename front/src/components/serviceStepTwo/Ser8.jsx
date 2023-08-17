import React, { useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import axios from 'axios'
import { API_URL } from '../../config'
import { t } from 'i18next'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Ser8 = () => {
    const { id } = useParams()
    const navigate = useNavigate();

    const [data, setData] = useState({
        level: '',
        service_id: id
    })

    const handleSubmit = () => {
        axios.defaults.withCredentials = true
        console.log(data)

        try {
            axios.post(`${API_URL}/payment`, data, { withCredentials: true })
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
        <div className='req'>
            <div className="inputt">
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
                
            </div>
            <input
                type="submit"
                value="submit now"
                onClick={() => handleSubmit()}
            />
        </div>
    )
}

export default Ser8