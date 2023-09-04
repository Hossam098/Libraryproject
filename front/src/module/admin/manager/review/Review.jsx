import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import data from './data.json';


const Review = () => {
  const navigate = useNavigate()
  const [student, setStudent] = React.useState(data)


  localStorage.setItem('i18nextLng', 'ar')

  useEffect(() => {
    // try {
    //   axios.defaults.withCredentials = true
    //   axios.get('http://localhost:5000/admin/allaaplication', { withCredentials: true })
    //     .then((res) => {
    //       setStudent(res.data)
    //       setFilter(res.data)
    //       setFilter2(res.data)
    //     }).catch((error) => {
    //       navigate('/adminLogin')
    //     })
    // } catch (error) {
    // }

  }, [])

  const [filter, setFilter] = useState(student);
  const [filter2, setFilter2] = useState(student);


  




  return (
    <>
      <section className='cotainer-stu'>
        <div className="navv">
          <h2>الطلاب</h2>
          <select
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
          </select>

        </div>
        <div className="student-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>اسم الطالب</th>
                <th> نوع الخدمه </th>
                <th>تاريخ التقديم</th>
                <th>اختيار</th>
              </tr>
            </thead>
            <tbody>
{(filter.length > 0 ? filter : filter2).map((item, index) => (
  !item.admin_id && (
    <tr key={item.student_id}>
      <td>{item.student_name}</td>
      <td>{item.ser_name}</td>
      <td>{item.submission_date.slice(0, 10)}</td>
      <td>
        <button>
          <Link to=''>تفاصيل</Link>
        </button>
      </td>
    </tr>
  )
))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default Review;