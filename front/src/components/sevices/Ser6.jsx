import React, { useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import './ser.css'
import axios from 'axios'
import { API_URL } from '../../config'
import { t } from 'i18next'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const Ser6 = () => {

  const { id } = useParams()
  const navigate = useNavigate();

  const [data, setData] = useState({
    degree: '',
    department: '',
    service_id: id
  })

  const handleSubmit = () => {
    axios.defaults.withCredentials = true
    console.log(data)
    const formData = new FormData();
    formData.append('level', data.level);
    formData.append('photo_college_letter', data.photo_college_letter);
    formData.append('service_id', data.service_id);

    try {
      axios.post(`${API_URL}/user/payment`, formData, { withCredentials: true })
        .then((res) => {
          console.log(res.data)
          alert("done")
        })
        .catch((err) => {
          if (err && err.response && err.response.data && err.response.data[0]) {
            if (!err.response.data[0].user && err.response.data[0].user != undefined) {
              navigate('/login')
              navigate(`/pay/${id}`)
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
        
          <div class="input" >
            <label >department </label>
            <input
              style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
              type="text"
              className=""
              placeholder="department"
              value={data.department}
              onChange={(e) => { setData({ ...data, department: e.target.value }) }}
            />
            
          </div>
          <div class="input" >
            <label >degree </label>
            <input
              style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
              type="text"
              className=""
              placeholder='degree'
              value={data.degree}
              onChange={(e) => { setData({ ...data, degree: e.target.value }) }}
            />
            
          </div>
        
      </div>
      <input
        type="submit"
        value="submit now"
        onClick={() => handleSubmit()}
      />
    </div>
  )
}

export default Ser6