import React from 'react'
import { MdAdd } from 'react-icons/md'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import img from '../../../../images/mini-logo.png'
import { API_URL } from '../../../../config';


const AdminsList = () => {

    const navigate = useNavigate()
    const [services, setServices] = React.useState([]);
    const [error, setErroe] = React.useState("");

    const [managers, setManagers] = React.useState([])
    const [managers2, setManagers2] = React.useState([])
    const [addManager, setAddManager] = React.useState({
        manager_name: '',
        manager_email: '',
        password: '',
        faculty_id: '',
        type: ''
    })
    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:5000/admin/getallManagers', { withCredentials: true })
            .then((res) => {
                setManagers(res.data)
            }).catch((error) => {
                if (error.response.status === 401) navigate('/AdminLogin')
                navigate('/AdminLogin')
            })

    }, [])
    useEffect(() => {

        axios.defaults.withCredentials = true
        try {
            axios.get(`${API_URL}/user/getAllServices`, { withCredentials: true })
                .then((res) => {
                    setServices(res.data)
                })
                .catch((err) => {

                })
        } catch (err) {
        }
    }, [])





    // const handleEdit = (index) => {
    //     let con = window.confirm('هل انت متاكد من التعديل')
    //     if (con) {
    //         axios.post('http://localhost:5000/superadmin/updatefaculty', facuality[index], { withCredentials: true })
    //             .then((res) => {
    //                 window.location.reload()
    //             }).catch((error) => {
    //             })
    //     }
    // }

    const handleEditm1 = (index) => {
        let con = window.confirm('هل انت متاكد من التعديل')
        if (con) {
            axios.put('http://localhost:5000/superadmin/updatemanager1', managers[index], { withCredentials: true })
                .then((res) => {
                    window.location.reload()
                }).catch((error) => {
                })
        }
    }

    const handleEditm2 = (index) => {
        let con = window.confirm('هل انت متاكد من التعديل')
        if (con) {
            axios.put('http://localhost:5000/superadmin/updatemanager2', managers2[index], { withCredentials: true })
                .then((res) => {
                    window.location.reload()
                }).catch((error) => {
                })
        }
    }

    const addm1 = () => {
        if (document.querySelector('.add-p input').value !== '' && document.querySelector('.add-p select').value !== '') {
            let con = window.confirm('هل انت متاكد من اضافه الموظف')
            if (con) {
                axios.post('http://localhost:5000/superadmin/addmanager1', addManager, { withCredentials: true })
                    .then((res) => {
                        alert('تم اضافه الموظف')
                        window.location.reload()
                    }).catch((error) => {
                        setErroe(error.response.data.errors.msg)
                    })
            }
        } else {
            alert('ادخل بيانات  الموظف')
        }
    }

    const addm2 = () => {
        let con = window.confirm('هل انت متاكد من اضافه الموظف')
        if (con) {
            axios.post('http://localhost:5000/superadmin/addmanager2', addManager, { withCredentials: true })
                .then((res) => {
                    alert('تم اضافه الموظف')
                    window.location.reload()
                }).catch((error) => {
                    setErroe(error.response.data.errors.msg)
                })
        }
    }





    return (
        <div className='super-container'>
            <img src={img} alt="img" />
            <section className='cotainer-stu'>

                <div className="student-container">
                    <div className="add-manager">
                        <h3 style={{ fontSize: "1.5rem" }}></h3>
                        <input
                            id='add-p'
                            onChange={(e) => { setAddManager({ ...addManager, manager_name: e.target.value }) }}
                            type="text"
                            placeholder='اسم الموظف' />
                        <input
                            id='add-p'
                            onChange={(e) => { setAddManager({ ...addManager, manager_email: e.target.value }) }}
                            type="email"
                            placeholder='البريد الالكترونى' />
                        <input
                            id='add-p'
                            onChange={(e) => { setAddManager({ ...addManager, password: e.target.value }) }}
                            type="text"
                            placeholder='كلمه المرور' />
                        <select onChange={(e) => { setAddManager({ ...addManager, faculty_id: e.target.value }) }}>
                            <option value=""> الخدمة </option>
                            {
                                services.map((item) => {
                                    return (
                                        <option value={item.id}> {item.service_name_ar} </option>
                                    )
                                }
                                )
                            }
                        </select>

                        {error ? <p > يرجى ادخال بيانات الموظف</p> : null}
                        <button
                            onClick={addm1}
                            className="add"> <MdAdd />  اضافه الموظف
                        </button>

                    </div>

                    <table className="data-table">
                        <tr>
                            <th> اسم الموظف </th>
                            <th> البريد الالكترونى </th>
                            <th> الخدمة</th>
                            <th> تعديل</th>

                        </tr>

                        {managers.map((manager, index) => {

                            return (
                                <tr key={index}>
                                    <td>
                                        <input 
                                        className='input-cell' 
                                        type="text" 
                                        value={manager.mname} 
                                        placeholder={manager.mname} 
                                        onChange={(e) => {
                                            const updatedManagers = [...managers];
                                            updatedManagers[index] = { ...manager, mname: e.target.value };
                                            setManagers(updatedManagers);
                                        }} />
                                        </td>
                                    <td>
                                        <input 
                                        className='input-cell' 
                                        type="text" 
                                        value={manager.email} 
                                        placeholder={manager.email} 
                                        onChange={(e) => {
                                            const updatedManagers = [...managers];
                                            updatedManagers[index] = { ...manager, email: e.target.value };
                                            setManagers(updatedManagers);
                                        }} /></td>
                                    <td>
                                        <select 
                                        name=""
                                        id=""
                                        className='ser-select'
                                        value={manager.service_id}
                                        >
                                         {
                                            services.map((service)=>(
                                                <option
                                                    value={service.id}                                                
                                                >{service.service_name_ar}
                                                </option>
                                            ))
                                         }   
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => { handleEditm1(index) }}>تعديل</button>
                                        <button className='delete' onClick={() => { handleEditm1(index) }}>حذف الموظف</button>
                                    </td>
                                    
                                </tr>

                            )
                        }
                        )}


                    </table>
                </div>
            </section>
            <section className='cotainer-stu'>
                <div className="student-container">
                    <h2>ادارة الخدمات</h2>
                    <table className="data-table">
                        <tr>
                            <th>  الخدمة </th>
                            <th> البريد الالكترونى </th>
                            
                            <th> تشغيل</th>
                            <th> تعديل</th>

                        </tr>

                        {services.map((service, index) => {

                            return (
                                <tr key={index}>
                                    <td>
                                        <input 
                                        className='input-cell' 
                                        type="text" 
                                        value={service.service_name_ar} 
                                        placeholder={service.service_name_ar} 
                                        onChange={(e) => {
                                            const updatedservices = [...services];
                                            updatedservices[index] = { ...service, service_name_ar: e.target.value };
                                            setServices(updatedservices);
                                        }} />
                                        </td>
                                    <td>
                                        <textarea 
                                        className='input-cell' 
                                        type="text" 
                                        value={service.pref_ar} 
                                        placeholder={service.pref_ar} 
                                        onChange={(e) => {
                                            const updatedservices = [...services];
                                            updatedservices[index] = { ...service, pref_ar: e.target.value };
                                            setServices(updatedservices);
                                        }} /></td>
                                    
                                    <td>{service.enabled == 1?
                                        <button 
                                        onChange={(e) => {
                                            const updatedservices = [...services];
                                            updatedservices[index] = { ...service, pref_ar: 0 };
                                            setServices(updatedservices);
                                        }}
                                        >ايقاف</button>
                                        :
                                        <button 
                                        onChange={(e) => {
                                            const updatedservices = [...services];
                                            updatedservices[index] = { ...service, pref_ar: 1 };
                                            setServices(updatedservices);
                                        }}
                                        >تشغيل</button>
                                    }
                                    </td>
                                    <td>
                                        <button onClick={() => { handleEditm1(index) }}>تعديل</button>
                                    </td>
                                    
                                </tr>

                            )
                        }
                        )}


                    </table>
                </div>
                </section>

        </div>
    )
}

export default AdminsList;