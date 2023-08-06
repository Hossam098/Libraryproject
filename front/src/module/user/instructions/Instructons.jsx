import React, { useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import Unav from '../../../components/userNav/Unav'
import PopupError from '../../../components/error/PopupError';

import './inst.css'

const Instructons = () => {

    const { id } = useParams()
    const navigate = useNavigate();
    const [logged, setLogged] = useState('')
    const [errors2, setErrors2] = useState('');

    useEffect(() => {
        try{
          if(!localStorage.getItem('token')){
            setLogged(false)
          }else{
            setLogged(true)
          }
        }catch(err){
          console.log(err)
        }
      }, [])

    const handleNext = ()=>{
        if(logged){
            navigate(`/service/${id}`)
        }else{
            setErrors2('you should login first');
        }
    }
    const handleCloseError = () => {
        setErrors2('');
      };


  return (
    <div>
        {errors2 && (
        <PopupError
          message={errors2}
          onClose={handleCloseError}
        />
      )}
        <Unav/>
        <div className="inst-container">
            <ol className="isntructions">
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>

            </ol>
            <button onClick={handleNext}>next</button>
        </div>
    </div>
  )
}

export default Instructons