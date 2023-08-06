import React, { useState } from 'react'
import './ser.css'
import axios from 'axios'
import { API_URL } from '../../config'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const Ser7 = () => {


  const { id } = useParams()
  const navigate = useNavigate();

  const [data, setData] = useState({

    service_id: id
  })

  const handleSubmit = () => {
    axios.defaults.withCredentials = true
    console.log(data)


    try {
      axios.post(`${API_URL}/user/`, data, { withCredentials: true })
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
      <input
        type="submit"
        value="payment code"
        onClick={() => handleSubmit()}
      />
    </div>
  )
}

export default Ser7
