import React from 'react'
import { MdAdd } from 'react-icons/md'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import img from '../../../../images/mini-logo.png'
import { API_URL } from '../../../../config';
import PopupErrorMsg from '../../../../components/error/PopupErrorMsg';
import { t } from 'i18next';


const AdminsList = () => {

    const navigate = useNavigate()
    const [services, setServices] = React.useState([]);
    const [error, setError] = React.useState("");

    const [managers, setManagers] = React.useState([])
    const [managers2, setManagers2] = React.useState([])
    const [addManager, setAddManager] = React.useState({
        mname: '',
        email: '',
        service_id: '',
    })
    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get(`${API_URL}/admin/getallManagers`, { withCredentials: true })
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




    const handleEditManager = async (index) => {
        try {
            if (managers[index].mname == '') return setError('ادخل اسم الموظف')
            if (managers[index].email == '') return setError('ادخل البريد الالكترونى')
            if (managers[index].service_id == '') return setError('اختر الخدمة')
            let con = window.confirm('هل انت متاكد من التعديل')
            if (con) {
                await axios.put(`${API_URL}/admin/updateManager`, managers[index], { withCredentials: true })
                    .then((res) => {
                        window.location.reload()
                    }).catch((error) => {
                        if (error.response.status === 401) navigate('/AdminLogin')
                        setError(error.response.data.message[0].msg)
                        console.log(error.response.data.message[0].msg)
                    })
            }
        } catch (err) {
            if (err.response.status === 401) navigate('/AdminLogin')
            console.log(err)
            setError(err)
        }
    }

    const handleDeleteManger = (index) => {
        try {
            let con = window.confirm('هل انت متاكد من الحذف')
            if (con) {
                axios.delete(`${API_URL}/admin/deleteManager/${managers[index].id}`, { withCredentials: true })
                    .then((res) => {
                        window.location.reload()
                    }).catch((error) => {
                        if (error.response.status === 401) navigate('/AdminLogin')
                        setError(error.response.data.message[0].msg)
                    })
            }
        } catch (err) {
            if (err.response.status === 401) navigate('/AdminLogin')
            setError(err)
        }
    }

    const addM = () => {
        if (addManager.mname !== '' && addManager.email !== '' && addManager.service_id !== '') {
            let con = window.confirm('هل انت متاكد من اضافه الموظف')
            if (con) {
                axios.post(`${API_URL}/admin/addManager`, addManager, { withCredentials: true })
                    .then((res) => {
                        setError('تم اضافه الموظف')
                        window.location.reload()
                    }).catch((error) => {
                        if (error.response.status === 401) navigate('/AdminLogin')
                        setError(error.response.data.message[0].msg)
                    })
            }
        } else {
            if (addManager.mname == '') {
                return setError('ادخل اسم الموظف')
            }
            if (addManager.email == '') {
                return setError('ادخل البريد الالكترونى')
            }
            if (addManager.service_id == '') {
                return setError('اختر الخدمة')
            }
        }
    }

    const handleEdits2 = (index) => {
        try {
            if (services[index].service_name_ar == '') return setError('ادخل اسم الخدمة بالعربى')
            if (services[index].pref_ar == '') return setError('ادخل وصف الخدمة بالعربى')
            if (services[index].service_name == '') return setError('ادخل اسم الخدمة بالانجليزى')
            if (services[index].pref == '') return setError('ادخل وصف الخدمة بالانجليزى')


            let con = window.confirm('هل انت متاكد من التعديل')
            if (con) {
                axios.put(`${API_URL}/admin/updateService`, services[index], { withCredentials: true })
                    .then((res) => {
                        setError('تم التعديل')

                        window.location.reload()
                    }).catch((error) => {
                        if (error.response.status === 401) navigate('/AdminLogin')
                        setError(error.response.data.message[0].msg)
                    })
            }
        } catch (err) {
            if (err.response.status === 401) navigate('/AdminLogin')
            setError(err)
        }
    }

    const handleEnable = (index) => {
        try {
            let con = window.confirm('هل انت متاكد من التعديل ')
            if (con) {
                axios.put(`${API_URL}/admin/enableService`, services[index], { withCredentials: true })
                    .then((res) => {
                        setError('تم ')
                        window.location.reload()
                    }).catch((error) => {
                        if (error.response.status === 401) navigate('/AdminLogin')
                        setError(error.response.data.message[0].msg)
                    })
            }
        } catch (err) {
            if (err.response.status === 401) navigate('/AdminLogin')
            setError(err)
        }
    }







    const addm1 = () => {
        if (document.querySelector('.add-p input').value !== '' && document.querySelector('.add-p select').value !== '') {
            let con = window.confirm('هل انت متاكد من اضافه الموظف')
            if (con) {
                axios.post(`${API_URL}/superadmin/addmanager1`, addManager, { withCredentials: true })
                    .then((res) => {
                        alert('تم اضافه الموظف')
                        window.location.reload()
                    }).catch((error) => {
                        setError(error.response.data.errors.msg)
                    })
            }
        } else {
            alert('ادخل بيانات  الموظف')
        }
    }

    const addm2 = () => {
        let con = window.confirm('هل انت متاكد من اضافه الموظف')
        if (con) {
            axios.post(`${API_URL}/superadmin/addmanager2`, addManager, { withCredentials: true })
                .then((res) => {
                    alert('تم اضافه الموظف')
                    window.location.reload()
                }).catch((error) => {
                    setError(error.response.data.errors.msg)
                })
        }
    }

    const handleClose = () => {
        setError("")
    }



    console.log(error)

    return (
        <div className='super-container'>
            <img src={img} alt="img" />
            <section className='cotainer-stu'>

                <div className="student-container">
                    <div className="add-manager">
                        <h3 className='table-title-h2'> اضافه موظف </h3>
                        <input
                            style={{ fontSize: "1.5rem" }}
                            id='add-p'
                            onChange={(e) => { setAddManager({ ...addManager, mname: e.target.value }) }}
                            type="text"
                            placeholder='اسم الموظف' />
                        <input
                            style={{ fontSize: "1.5rem" }}
                            id='add-p'
                            onChange={(e) => { setAddManager({ ...addManager, email: e.target.value }) }}
                            type="email"
                            placeholder='البريد الالكترونى' />

                        <select
                            onChange={(e) => { setAddManager({ ...addManager, service_id: e.target.value }) }}>
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

                        <button
                            onClick={() => { addM() }}
                            className="add"> <MdAdd />  اضافه الموظف
                        </button>

                    </div>
                    <hr style={{ width: "80%", margin: "2rem 0" }} />
                    <h2 className='table-title-h2'>
                        ادارة الموظفين
                    </h2>
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
                                            }} />
                                    </td>
                                    <td>
                                        <select
                                            name=""
                                            id=""
                                            className='ser-select'
                                            value={manager.service_id}
                                            onChange={(e) => {
                                                const updatedManagers = [...managers];
                                                updatedManagers[index] = { ...manager, service_id: e.target.value };
                                                setManagers(updatedManagers);
                                            }}
                                        >
                                            {services.map((service) => (
                                                <option value={service.id}>
                                                    {service.service_name_ar}
                                                </option>
                                            ))
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => { handleEditManager(index) }}>تعديل</button>
                                        <button className='delete' onClick={() => { handleDeleteManger(index) }}>حذف الموظف</button>
                                    </td>

                                </tr>

                            )
                        }
                        )}


                    </table>
                </div>
            </section>
            <section className='cotainer-stu' style={{ marginTop: "2rem" }}>
                <div className="student-container">
                    <h2 className='table-title-h2'>
                        ادارة الخدمات
                    </h2>
                    <table className="data-table">
                        <tr>
                            <th> اسم الخدمة بالعربى </th>
                            <th> اسم الخدمة بالانجليزى </th>
                            <th> الوصف بالعربى </th>
                            <th> الوصف بالانجليزى </th>
                            <th> التحكم </th>

                        </tr>

                        {services.map((service, index) => {
                            if (index >= 8) {
                                return null; // Skip rendering for index >= 5
                            }
                            return (
                                <tr key={index}>
                                    <td style={{ width: "15%" }}>
                                        <textarea
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
                                    <td style={{ width: "15%" }}>
                                        <textarea
                                            className='input-cell'
                                            type="text"
                                            value={service.service_name}
                                            placeholder={service.service_name}
                                            onChange={(e) => {
                                                const updatedservices = [...services];
                                                updatedservices[index] = { ...service, service_name: e.target.value };
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
                                            }} />
                                    </td>
                                    <td>
                                        <textarea
                                            className='input-cell'
                                            type="text"
                                            value={service.pref}
                                            placeholder={service.pref}
                                            onChange={(e) => {
                                                const updatedservices = [...services];
                                                updatedservices[index] = { ...service, pref: e.target.value };
                                                setServices(updatedservices);
                                            }} />
                                    </td>
                                    <td style={{ width: "15%" }}>
                                        <button onClick={() => { handleEdits2(index) }}>تعديل</button>

                                        {+service.enabled == 1 ?
                                            <button
                                                className='delete'
                                                onClick={() => { handleEnable(index) }}
                                            >
                                                ايقاف مؤقت للخدمة
                                            </button>
                                            :
                                            <button
                                                className='enable'
                                                onClick={() => { handleEnable(index) }}
                                            >
                                                تشغيل الخدمة
                                            </button>
                                        }
                                    </td>

                                </tr>

                            )
                        }
                        )}


                    </table>
                </div>
            </section>
            {error && <PopupErrorMsg message={error} onClose={handleClose} />}

        </div>
    )
}

export default AdminsList;