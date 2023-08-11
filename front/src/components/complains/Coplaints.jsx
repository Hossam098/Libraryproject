import React from 'react'
import './coplains.css'
import QR from '../../images/QR.png'
const Coplaints = () => {
  return (
    <div className='contnaier'>
        <h2>
            هل لديك استفسار أو شكوى أو اقتراح؟  
        </h2>
        <div className="flex-row">
            <p>
            في حال إذا ما كان
             لديك استفسار أو شكوى أو حتى اقتراح 
            لتحسين العمل في وحدة المكتبة الرقمية، 
            وذلك بهدف تحسين العمل في الوحدة
             وتطوير الأداء وتقويمه وذلك للوصول
             إلى مستوى خدمة نموذجي ومتميز.
            </p>
            <img src={QR} alt="" className='QR'/>
        </div>
        <button className="c-button">
            أضغط هنا    
        </button>
    </div>
  )
}

export default Coplaints