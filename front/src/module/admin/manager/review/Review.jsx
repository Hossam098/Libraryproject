import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import img from '../../../../images/mini-logo.png'



const Review = () => {
  const navigate = useNavigate()
  const [student, setStudent] = React.useState([])


  localStorage.setItem('i18nextLng', 'ar')

  useEffect(() => {
    try {
      axios.defaults.withCredentials = true
      axios.get('http://localhost:5000/manager/getallApplicantsAssigned', { withCredentials: true })
        .then((res) => {
          setStudent(res.data)
          // setFilter(res.data)
          // setFilter2(res.data)
        }).catch((error) => {
          if(error.response.status === 401) navigate('/ManagerLogin')
          navigate('/ManagerLogin')
        })
    } catch (error) {
    }

  }, [])

  // const [filter, setFilter] = useState(student);
  // const [filter2, setFilter2] = useState(student);


  console.log(student)




  return (
    <div className='super-container'>
      <section className='cotainer-stu'>
      <img src={img} alt="img" />
        <div className="navv">
          <h2>الطلاب</h2>
          {/* <select
            onChange={(e) => {
              const filteredStudents = e.target.value === ''
                ? student
                : student.filter((item) => item.status === parseInt(e.target.value));
              setFilter(filteredStudents);
              setFilter2(filteredStudents);
            }}
            className='filter'
            name=""
            id=""
          >
            <option value="">فلتره</option>
            <option value="5">مرفوض من الجامعه</option>
            <option value="4">موافقه من الجامعه</option>
            <option value="1">موافقه كليه</option>
          </select> */}

        </div>
        <div className="student-container">
          {/* {student  && <h2>{student}</h2>} */}
          {student.length > 0 ?(
          <table className="data-table">
            <thead>
              <tr>
                <th>اسم الطالب</th>
                <th> نوع الخدمه </th>
                <th>تاريخ التقديم</th>
                <th> حاله الخدمه </th>
                <th>التفاصيل</th>
              </tr>
            </thead>
            <tbody>
{student.length > 0 && student.map((item, index) => (
    <tr key={item.student_id}>
      <td>{item.name}</td>
      <td>{item.service_name_ar}</td>
      <td>{item.submit_date.slice(0, 10)}</td>
      <td>{item.status === 0 ? "منتظر كود دفع" : item.status === 1 ? "في انتظار رفع المرفقات" : item.status === 2 ? "في انتظار رد المكتبه" : item.status === 3 ? "قيد التعديل" : item.status === 4 ? "قيد التعديل" : item.status === 5 ? "مقبول" : item.status === 6 ? "مرفوض" : null}</td>
      <td>
        <button>
      
          <Link to={`/manager/show/${item.id}`}>تفاصيل</Link>
          </button>
      </td>
    </tr>
  
))}
            </tbody>
          </table>
          ):<h2 style={{marginBottom:"1rem"}}>لا يوجد طلبات بعد</h2>}
        </div>
      </section>
    </div>
  )
}

export default Review;