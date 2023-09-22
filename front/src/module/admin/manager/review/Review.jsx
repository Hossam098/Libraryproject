import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import img from '../../../../images/mini-logo.png'



const Review = () => {
  const navigate = useNavigate()
  const [student, setStudent] = React.useState([])
  const [ser_name, setSer_name] = ("")



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
          if (error.response.status === 401) navigate('/ManagerLogin')
          navigate('/ManagerLogin')
        })
    } catch (error) {
    }

  }, [])

  // const [filter, setFilter] = useState(student);
  // const [filter2, setFilter2] = useState(student);


  console.log(student)

  const sername = (item) => {
    const ser_name = item.ser_reg !== null ?
      'ser_reg' : item.ser_formation !== null ?
        'ser_formation' : item.ser_grant !== null ?
          'ser_grant' : item.ser_personal !== null ?
            'ser_personal' : item.ser_upgrade !== null ?
              'ser_upgrade' : item.ser_knowledge !== null ?
                'ser_knowledge' : item.ser_magazine !== null ?
                  'ser_magazine' : item.ser_best !== null ?
                    'ser_best' : null

    return ser_name;
  }
  const app_id = (item) => {
    const appid = item.ser_reg !== null ?
      item.ser_reg : item.ser_formation !== null ?
        item.ser_formation : item.ser_grant !== null ?
          item.ser_grant : item.ser_personal !== null ?
            item.ser_personal : item.ser_upgrade !== null ?
              item.ser_upgrade : item.ser_knowledge !== null ?
                item.ser_knowledge : item.ser_magazine !== null ?
                  item.ser_magazine : item.ser_best !== null ?
                    item.ser_best : null

    return appid;
  }


  return (
    <div className='super-container'>
      <img src={img} alt="img" />

      <section className='cotainer-stu'>
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
          {student.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                <th>التسلسل</th>

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
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.service_name_ar}</td>
                    <td>{item.status === 0 ? item.req_code_date?.slice(0, 10) : item.submit_date?.slice(0, 10)}</td>
                    <td>{item.status === 0 ? "منتظر كود دفع" : item.status === 1 ? "في انتظار رفع المرفقات" : item.status === 2 ? "في انتظار رد المكتبه" : item.status === 3 ? "قيد التعديل" : item.status === 4 ? "قيد التعديل" : item.status === 5 ? "مقبول" : item.status === 6 ? "مرفوض" : null}</td>
                    <td>
                    <button 
                      onClick={() => {
                        navigate(`/manager/show/${item.user_id},${item.service_id},${sername(item)},${app_id(item)}`)
                      }
                      }>


                        {/* <Link to={`/manager/show/${item.user_id},${item.service_id},${sername(item)},${app_id(item)}`}> */}
                          تفاصيل
                        {/* </Link> */}
                      </button>
                    </td>
                  </tr>

                ))}
              </tbody>
            </table>
          ) : <h2 style={{ marginBottom: "1rem" }}>لا يوجد طلبات بعد</h2>}
        </div>
      </section>
    </div>
  )
}

export default Review;