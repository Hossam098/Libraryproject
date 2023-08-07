import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Unav from '../../../components/userNav/Unav'
import PopupError from '../../../components/error/PopupError';
import { useTranslation } from 'react-i18next';

import './inst.css'
import { t } from 'i18next';

const Instructons = () => {


  const { id } = useParams()
  const navigate = useNavigate();
  const [logged, setLogged] = useState('')
  const [errors2, setErrors2] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    try {
      if (!localStorage.getItem('token')) {
        setLogged(false)
      } else {
        setLogged(true)
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleNext = () => {
    if (logged) {
      navigate(`/service/${id}`)
    } else {
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
      <Unav />
      {id == 1 ?

        <div className="inst-container">
          <div className="information-service">
            <img src="../assets/mini-logo.png" alt="" />
            <div className="information-service_body">
              <h1>{t('service1-name')}</h1>
              <hr style={{width:"60%"}}/>
              <h2 style={localStorage.getItem('i18nextLng') == 'ar' ? { textAlign: 'right' ,width:"100%" } : { textAlign: 'left' ,width:"100%"}}>
                {t('service-steps')}
              </h2>
              <ul className='list-steps' style={localStorage.getItem('i18nextLng') == 'ar' ? { direction: 'rtl', width: '100%' } : { direction: 'ltr', width: '100%' }}>
                <li>1- {t('service1-step1')}</li>
                <li>2- {t('service1-step2')}</li>
                <li>3- {t('service1-step3')}</li>
                <li>4- {t('service1-step4')}</li>
                <li>5- {t('service1-step5')}</li>
                <li>6- {t('service1-step6')}</li>
              </ul>
              <button onClick={handleNext} className='sub-now'>{t('sub-now')}</button>
            </div>
          </div>
        </div>

        : id == 2 ?
          <div className="inst-container">
            <div className="information-service">
              <img src="../assets/mini-logo.png" alt="" />
              <div className="information-service_body">
                <h1>Instructions2</h1>
                <p>2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                <button onClick={handleNext}>next</button>
              </div>
            </div>
          </div>
          : id == 3 ?
          <div className="inst-container">
            <div className="information-service">
              <img src="../assets/mini-logo.png" alt="" />
              <div className="information-service_body">
                <h1>Instructions3</h1>
                <p>2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                <button onClick={handleNext}>next</button>
              </div>
            </div>
          </div>
          : id == 4 ?
          <div className="inst-container">
            <div className="information-service">
              <img src="../assets/mini-logo.png" alt="" />
              <div className="information-service_body">
                <h1>Instructions4</h1>
                <p>2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                <button onClick={handleNext}>next</button>
                </div> 
                </div>
                </div>
                : id == 5 ?
                <div className="inst-container">
            <div className="information-service">
              <img src="../assets/mini-logo.png" alt="" />
              <div className="information-service_body">
                <h1>Instructions5</h1>
                <p>2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                <button onClick={handleNext}>next</button>
              </div>
            </div>
          </div>
          : id == 6 ?
          <div className="inst-container">
            <div className="information-service">
              <img src="../assets/mini-logo.png" alt="" />
              <div className="information-service_body">
                <h1>Instructions6</h1>
                <p>2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                <button onClick={handleNext}>next</button>
              </div>
            </div>
          </div>
          : id == 7 ?
          <div className="inst-container">
            <div className="information-service">
              <img src="../assets/mini-logo.png" alt="" />
              <div className="information-service_body">
                <h1>Instructions7</h1>
                <p>2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                <button onClick={handleNext}>next</button>
              </div>
            </div>
          </div>
          : id == 8 ?
          <div className="inst-container">
            <div className="information-service">
              <img src="../assets/mini-logo.png" alt="" />
              <div className="information-service_body">
                <h1>Instructions8</h1>
                <p>2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                <button onClick={handleNext}>next</button>
              </div>
            </div>
          </div>
          : null
      }

    </div>
  )
}

export default Instructons