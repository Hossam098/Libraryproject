import React, { useEffect } from 'react'
import './studentlist.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import data from './data.json';
import admin from './admin.json'

const StudentListadmin = () => {
  const navigate = useNavigate()
  const [student, setStudent] = React.useState(data)
  const [admins, setAdmins] = React.useState(admin)
  const [managerid, setmanagerid] =React.useState("")
  const [role ,setRole ] =React.useState("")

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


  const [selected, setSelected] = useState([])

  useEffect(() => {
    console.log(selected)

  }, [selected])


  return (
    <>
      <section className='cotainer-stu'>
        <div className="navv">
          <h2>الطلاب</h2>
          <select

            // onChange={(e) => {
            //   const filteredStudents = e.target.value === ''
            //     ? student
            //     : student.filter((item) => item.status === parseInt(e.target.value));
            //   setFilter(filteredStudents);
            //   setFilter2(filteredStudents);
            // }}
            className='filter'
            name=""
            id=""
            onChange={(e)=>{setRole(e.target.value)}}
          >
            <option value="">الصلاحيات</option>
            <option value="1"> مراجعه فقط </option>
            <option value="2"> تحكم كامل </option>
          </select>
          <select
            className='filter'
            name=""
            id=""
            onChange={(e)=>{setmanagerid(e.target.value)}}
          >
            <option value="">اختر الادمن</option>
            {admins.map((admin)=>
              (
                <option value={admin.admin_id} key={admin.admin_id}>{admin.admin_name}</option>
              )
            )}
          </select>
          { selected.length > 0 &&
          <button>تأكيد</button>
        }
        </div>
        <div className="student-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>اسم الطالب</th>
                <th> نوع الخدمه </th>
                <th>تاريخ التقديم</th>
                <th> حاله الخدمه </th>
                {(managerid && role) &&<th>اختيار</th>}
              </tr>
            </thead>
            <tbody>
{(filter.length > 0 ? filter : filter2).map((item, index) => (
  !item.admin_id && (
    <tr key={item.student_id}>
      <td>{item.student_name}</td>
      <td>{item.ser_name}</td>
      <td>{item.submission_date.slice(0, 10)}</td>
      <td>{item.status === 1 ? 'موافقه كليه' : item.status === 2 ? 'موافقه عماده' : item.status === 3 ? 'موافقه وزاره' : item.status === 4 ? 'موافقه جامعه' : 'مرفوض'}</td>
      {(managerid && role) &&<td>
        
        <input
            onClick={(e) => {
              if (e.target.checked) {
                setSelected((prev) => [
                  ...prev,
                  {
                    student_id: item.student_id,
                    managerid: managerid,
                    role: role,
                  },
                ]);
              } else {
                setSelected((prev) =>
                  prev.filter(
                    (selectedItem) =>
                      selectedItem.student_id !== item.student_id ||
                      selectedItem.managerid !== managerid ||
                      selectedItem.role !== role
                  )
                );
              }
            }}
          type="checkbox"
          name=""
          id=""
        />
      
      </td>}
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

export default StudentListadmin;