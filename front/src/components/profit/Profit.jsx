import React from 'react'
import './profit.css'
import {FaUserGraduate} from "react-icons/fa"
import {FaUserTie} from "react-icons/fa"
import {FaRegNewspaper} from "react-icons/fa"
import {ImOffice} from "react-icons/im"

const Profit = () => {
  return (
    <div className='profit'>
        <div className="intro-text">
            <h1>
            مجتمع المستفيدين
            </h1>
            <p>
            تخدم المكتبة قطاع كبير من 
            المستفيدين كأعضاء
             هيئة التدريس وطلاب الدراسات العليا
             وطلاب المرحلة الجامعية الأولى، بالإضافة 
            إلى المؤسسات البحثية والتعليمية الأخرى
             مثل الجامعات الخاصة والأهلية والمعاهد
             التعليمية. وكذلك المجلات والدوريات 
            العلمية داخل الجامعة وخارجها. 
            </p>
        </div>
        <div className="icons-cont">
            <div className="icon-cont">                
                <FaUserGraduate className='icon'/>
                <p>طلاب الدراسات العليا والباحثون</p>
            </div>
            <div className="icon-cont">                
                <FaRegNewspaper className='icon'/>
                <p>المجلات والدوريات العلمية</p>
            </div>
            <div className="icon-cont">                
                <ImOffice className='icon'/>
                <p>الجامعات والمعاهد الخاصة والأهلية</p>
            </div>
            <div className="icon-cont">                
                <FaUserTie className='icon'/>
                <p>أعضاء هيئة التدريس</p>
            </div>
        </div>
    </div>
  )
}

export default Profit