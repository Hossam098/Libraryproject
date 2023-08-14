import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Unav from '../../../components/userNav/Unav'
import PopupError from '../../../components/error/PopupError';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import './inst.css'
import { t } from 'i18next';
import { API_URL } from '../../../config';

const Instructons = () => {


  const { id } = useParams()
  const navigate = useNavigate();
  const [logged, setLogged] = useState('')
  const [errors2, setErrors2] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    try {
      axios.defaults.withCredentials = true
      axios.get(`${API_URL}/auth/check`, { withCredentials: true })
        .then((res) => {
          console.log(res)
          setLogged(true)
        })
        .catch((err) => {
          console.log(err)
          setLogged(false)
        })
    } catch (err) {
      console.log(err)
      setLogged(false)
    }
  }, [])

  const handleNext = () => {
    if (logged) {
      navigate(`/service/${id}`)
    } else {
      setErrors2(t('err-Login'));
    }
  }
  const handleCloseError = () => {
    setErrors2('');
  };


  return (
    <div className="inst" style={{ backgroundColor: '#fff' }}>
      {errors2 && (
        <PopupError
          message={errors2}
          onClose={handleCloseError}
        />
      )}

      <div className="inst-container" style={localStorage.getItem('i18nextLng') == 'ar' ? { direction: 'rtl' } : { direction: 'ltr' }}>
        <img src="../assets/mini-logo.png" alt="" />
        <div className="information-service_body">
          <h1>{t(`service${id}-name`)}</h1>
          <hr style={{ width: "60%" }} />
          <h2 style={{ color: "#d3cccc" }}>{t(`service${id}-pay`)}</h2>
          <h2 style={localStorage.getItem('i18nextLng') == 'ar' ? { textAlign: 'right', width: "100%" } : { textAlign: 'left', width: "100%" }}>
            {t('service-steps')}
          </h2>
          <ul className='list-steps' style={localStorage.getItem('i18nextLng') == 'ar' ? { direction: 'rtl', width: '100%' } : { direction: 'ltr', width: '100%' }}>
            <li>1- {t('service1-step1')}</li>
            {id == 1 || id == 2 || id == 5 || id == 7 || id == 8 ?
              <li>2- {t('service1-step2')}</li>
              : null
            }
            <p>*** {t('service1-step3')} ***</p>
            <li>3- {t('service1-step4')}</li>
            <li>4- {t('service1-step5')}</li>
            <li>5- {t('service1-step6')}</li>
          </ul>
          <h2 style={localStorage.getItem('i18nextLng') == 'ar' ? { textAlign: 'right', width: "100%"   ,  color: "#ad8700"} : { textAlign: 'left', width: "100%"  ,  color: "#ad8700"}}>
            {t('service-worning')}
          </h2>
          <ul className='list-steps' style={localStorage.getItem('i18nextLng') == 'ar' ? { direction: 'rtl', width: '100%'  ,  color: "#ad8700"} : { direction: 'ltr', width: '100%' ,  color: "#ad8700" }}>

            <li>
              1- {t(`service${id}-w.1`)}
            </li>
            <li>
              2- {t(`service${id}-w.2`)} 
            </li>



          </ul>
          <button onClick={handleNext} className='sub-now'>{t('sub-now')}</button>
        </div>
      </div>
    </div>










    // <div className='inst' style={localStorage.getItem('i18nextLng') == 'ar' ? { direction: 'rtl' } : { direction: 'ltr' }}>
    //   {errors2 && (
    //     <PopupError
    //       message={errors2}
    //       onClose={handleCloseError}
    //     />
    //   )}

    //   {id == 1 ?

    //     <div className="inst-container">
    //     <div className="information-service">

    //       <div className="information-service_body">
    //         <h1>{t('service2-name')}</h1>
    //         <hr style={{ width: "60%" }} />
    //         <h2 style={localStorage.getItem('i18nextLng') == 'ar' ? { textAlign: 'right', width: "100%" } : { textAlign: 'left', width: "100%" }}>
    //           {t('service-steps')}
    //         </h2>
    //         <ul className='list-steps' style={localStorage.getItem('i18nextLng') == 'ar' ? { direction: 'rtl', width: '100%' } : { direction: 'ltr', width: '100%' }}>
    //           <li>1- {t('service1-step1')}</li>
    //           <li>2- {t('service1-step2')}</li>
    //           <li>*** {t('service1-step3')} ***</li>
    //           <li>3- {t('service1-step4')}</li>
    //           <li>4- {t('service1-step5')}</li>
    //           <li>5- {t('service1-step6')}</li>
    //         </ul>
    //         <button onClick={handleNext} className='sub-now'>{t('sub-now')}</button>
    //       </div>
    //     </div>
    //   </div>

    //     : id == 2 ?

    //       <div className="inst-container">
    //         <div className="information-service">
    //           <img src="../assets/mini-logo.png" alt="" />
    //           <div className="information-service_body">
    //             <h1>{t('service2-name')}</h1>
    //             <hr style={{ width: "60%" }} />
    //             <h2 style={localStorage.getItem('i18nextLng') == 'ar' ? { textAlign: 'right', width: "100%" } : { textAlign: 'left', width: "100%" }}>
    //               {t('service-steps')}
    //             </h2>
    //             <ul className='list-steps' style={localStorage.getItem('i18nextLng') == 'ar' ? { direction: 'rtl', width: '100%' } : { direction: 'ltr', width: '100%' }}>
    //               <li>1- {t('service1-step1')}</li>
    //               <li>2- {t('service1-step2')}</li>
    //               <li>*** {t('service1-step3')} ***</li>
    //               <li>3- {t('service1-step4')}</li>
    //               <li>4- {t('service2-step5')}</li>
    //               <li>5- {t('service2-step6')}</li>
    //             </ul>
    //             <button onClick={handleNext} className='sub-now'>{t('sub-now')}</button>
    //           </div>
    //         </div>
    //       </div>

    //       : id == 3 ?


    //         <div className="inst-container">
    //           <div className="information-service">
    //             <img src="../assets/mini-logo.png" alt="" />
    //             <div className="information-service_body">
    //               <h1>{t('service2-name')}</h1>
    //               <hr style={{ width: "60%" }} />
    //               <h2 style={localStorage.getItem('i18nextLng') == 'ar' ? { textAlign: 'right', width: "100%" } : { textAlign: 'left', width: "100%" }}>
    //                 {t('service-steps')}
    //               </h2>
    //               <ul className='list-steps' style={localStorage.getItem('i18nextLng') == 'ar' ? { direction: 'rtl', width: '100%' } : { direction: 'ltr', width: '100%' }}>
    //                 <li>1- {t('service1-step1')}</li>
    //                 <li>*** {t('service1-step3')} ***</li>
    //                 <li>3- {t('service1-step4')}</li>
    //                 <li>4- {t('service3-step5')}</li>
    //               </ul>
    //               <button onClick={handleNext} className='sub-now'>{t('sub-now')}</button>
    //             </div>
    //           </div>
    //         </div>

    //         : id == 4 ?
    //           <div className="inst-container">
    //             <div className="information-service">
    //               <img src="../assets/mini-logo.png" alt="" />
    //               <div className="information-service_body">
    //                 <h1>{t('service4-name')}</h1>
    //                 <hr style={{ width: "60%" }} />
    //                 <h2 style={localStorage.getItem('i18nextLng') == 'ar' ? { textAlign: 'right', width: "100%" } : { textAlign: 'left', width: "100%" }}>
    //                   {t('service-steps')}
    //                 </h2>
    //                 <ul className='list-steps' style={localStorage.getItem('i18nextLng') == 'ar' ? { direction: 'rtl', width: '100%' } : { direction: 'ltr', width: '100%' }}>
    //                   <li>1- {t('service1-step1')}</li>
    //                   <li>*** {t('service1-step3')} ***</li>
    //                   <li>2- {t('service1-step4')}</li>
    //                   <li>3- {t('service3-step5')}</li>

    //                 </ul>
    //                 <button onClick={handleNext} className='sub-now'>{t('sub-now')}</button>
    //               </div>
    //             </div>
    //           </div>
    //           : id == 5 ?
    //             <div>
    //               <div className="inst-container">
    //                 <div className="information-service">
    //                   <img src="../assets/mini-logo.png" alt="" />
    //                   <div className="information-service_body">
    //                     <h1>{t('service5-name')}</h1>
    //                     <hr style={{ width: "60%" }} />
    //                     <h2 style={localStorage.getItem('i18nextLng') == 'ar' ? { textAlign: 'right', width: "100%" } : { textAlign: 'left', width: "100%" }}>
    //                       {t('service-steps')}
    //                     </h2>
    //                     {/* <ul className='list-steps' style={localStorage.getItem('i18nextLng') == 'ar' ? { direction: 'rtl', width: '100%' } : { direction: 'ltr', width: '100%' }}>
    //                     <li>1- {t('service1-step1')}</li>
    //                     <li>2- {t('service1-step2')}</li>
    //                     <li>3- {t('service1-step3')}</li>
    //                     <li>4- {t('service1-step4')}</li>
    //                     <li>5- {t('service1-step5')}</li>
    //                     <li>6- {t('service1-step6')}</li>
    //                   </ul>
    //                   <button onClick={handleNext} className='sub-now'>{t('sub-now')}</button> */}
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="inst-container">
    //                 <div className="information-service">
    //                   <div className="information-service_body">
    //                     <h1>{t('service5-name')}</h1>
    //                     <hr style={{ width: "60%" }} />
    //                     <h2 style={localStorage.getItem('i18nextLng') == 'ar' ? { textAlign: 'right', width: "100%" } : { textAlign: 'left', width: "100%" }}>
    //                       {t('service-steps')}
    //                     </h2>
    //                     {/* <ul className='list-steps' style={localStorage.getItem('i18nextLng') == 'ar' ? { direction: 'rtl', width: '100%' } : { direction: 'ltr', width: '100%' }}>
    //                     <li>1- {t('service1-step1')}</li>
    //                     <li>2- {t('service1-step2')}</li>
    //                     <li>3- {t('service1-step3')}</li>
    //                     <li>4- {t('service1-step4')}</li>
    //                     <li>5- {t('service1-step5')}</li>
    //                     <li>6- {t('service1-step6')}</li>
    //                   </ul>
    //                   <button onClick={handleNext} className='sub-now'>{t('sub-now')}</button> */}
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             : id == 6 ?
    //               <div className="inst-container">
    //                 <div className="information-service">
    //                   <img src="../assets/mini-logo.png" alt="" />
    //                   <div className="information-service_body">
    //                     <h1>{t('service6-name')}</h1>
    //                     <hr style={{ width: "60%" }} />
    //                     <h2 style={localStorage.getItem('i18nextLng') == 'ar' ? { textAlign: 'right', width: "100%" } : { textAlign: 'left', width: "100%" }}>
    //                       {t('service-steps')}
    //                     </h2>
    //                     <ul className='list-steps' style={localStorage.getItem('i18nextLng') == 'ar' ? { direction: 'rtl', width: '100%' } : { direction: 'ltr', width: '100%' }}>
    //                       <li>1- {t('service1-step1')}</li>
    //                       <li>*** {t('service1-step3')} ***</li>
    //                       <li>2- {t('service1-step4')}</li>
    //                       <li>3- {t('service3-step5')}</li>
    //                     </ul>
    //                     <button onClick={handleNext} className='sub-now'>{t('sub-now')}</button>
    //                   </div>
    //                 </div>
    //               </div>
    //               : id == 7 ?
    //                 <div className="inst-container">
    //                   <div className="information-service">
    //                     <img src="../assets/mini-logo.png" alt="" />
    //                     <div className="information-service_body">
    //                       <h1>{t('service1-name')}</h1>
    //                       <hr style={{ width: "60%" }} />
    //                       <h2 style={localStorage.getItem('i18nextLng') == 'ar' ? { textAlign: 'right', width: "100%" } : { textAlign: 'left', width: "100%" }}>
    //                         {t('service-steps')}
    //                       </h2>
    //                       <ul className='list-steps' style={localStorage.getItem('i18nextLng') == 'ar' ? { direction: 'rtl', width: '100%' } : { direction: 'ltr', width: '100%' }}>
    //                         <li>1- {t('service1-step1')}</li>
    //                         <li>2- {t('service1-step2')}</li>
    //                         <li>3- {t('service1-step3')}</li>
    //                         <li>4- {t('service1-step4')}</li>
    //                         <li>5- {t('service1-step5')}</li>
    //                         <li>6- {t('service1-step6')}</li>
    //                       </ul>
    //                       <button onClick={handleNext} className='sub-now'>{t('sub-now')}</button>
    //                     </div>
    //                   </div>
    //                 </div>
    //                 : id == 8 ?
    //                   <div className="inst-container">
    //                     <div className="information-service">
    //                       <img src="../assets/mini-logo.png" alt="" />
    //                       <div className="information-service_body">
    //                         <h1>{t('service2-name')}</h1>
    //                         <hr style={{ width: "60%" }} />
    //                         <h2 style={localStorage.getItem('i18nextLng') == 'ar' ? { textAlign: 'right', width: "100%" } : { textAlign: 'left', width: "100%" }}>
    //                           {t('service-steps')}
    //                         </h2>
    //                         <ul className='list-steps' style={localStorage.getItem('i18nextLng') == 'ar' ? { direction: 'rtl', width: '100%' } : { direction: 'ltr', width: '100%' }}>
    //                           <li>1- {t('service1-step1')}</li>
    //                           <li>2- {t('service1-step2')}</li>
    //                           <li>3- {t('service1-step3')}</li>
    //                           <li>4- {t('service1-step4')}</li>
    //                           <li>5- {t('service1-step5')}</li>
    //                           <li>6- {t('service1-step6')}</li>
    //                         </ul>
    //                         <button onClick={handleNext} className='sub-now'>{t('sub-now')}</button>
    //                       </div>
    //                     </div>
    //                   </div>
    //                   : null
    //   }

    // </div>
  )
}

export default Instructons