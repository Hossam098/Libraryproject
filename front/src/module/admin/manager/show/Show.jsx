import { BiSolidPrinter } from 'react-icons/bi'
import './show.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf'
import pimg from '../../../../images/Ellipse 1.png'
import { BiImageAdd } from 'react-icons/bi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { API_URL } from "../../../../config"
import PopupErrorMsg from '../../../../components/error/PopupErrorMsg';


const ShowA = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const pdfRef = useRef()
  const [rejRes, SetRejRes] = useState("")
  const [msg, setMsg] = useState('')
  const [progress, setProgress] = useState({ started: false, value: 0 })
  const [confirm, setConfirm] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [payment_code, setPayment_code] = useState('')

  const dataArray = id.split(",");
  const [response, setResponse] = useState({
    response_text: "",
    response_pdf: "",
  })
  const [action, setAction] = useState({
    status: 0,
    column: '',
    reason: '',
    student_id: '',
    ser_id: '',
    ser_name: '',
    app_id: ''
  })



  const [data, SetData] = useState({
    student_id: dataArray[0],
    ser_id: dataArray[1],
    ser_name: dataArray[2],
    app_id: dataArray[3]
  })


  const navigate = useNavigate()
  const [user, setUser] = useState({})
  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get(`http://localhost:5000/user/getuserbyid/${data.ser_id}/${data.ser_name}/${data.student_id}/${data.app_id}`, { withCredentials: true })
      .then((res) => {
        setUser(res.data)
      }).catch((error) => {
        if (error.response.status == 401)
          navigate('/ManagerLogin')

      })
  }, [])
  const openImage = (url) => {
    const filename = url.split('/').pop();
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.target = '_blank';
    aTag.click();
    aTag.remove();
  }
  const downloadImage = (url) => {
    saveAs(url, 'image.jpg')
  }

  const downloadPDF = () => {
    const inpput = pdfRef.current;
    html2canvas(inpput).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf('l', 'px', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgwidth = canvas.width;
      const imgheight = canvas.height;
      const ratio = imgwidth / imgheight >= pdfWidth / pdfHeight ? pdfWidth / imgwidth : pdfHeight / imgheight;
      const imgx = (pdfWidth - imgwidth * ratio) / 2;
      const imgy = (pdfHeight - imgheight * ratio) / 2;
      pdf.addImage(imgData, 'PNG', imgx, imgy, imgwidth * ratio, imgheight * ratio);
      pdf.save('download.pdf');
    })
  }

  const [errors, setErrors] = useState()

  const increaseDateByOneDay = (date) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    return currentDate.toISOString().slice(0, 10);
  };

  const handleCloseError = () => {
    setErrors('')
  }



  const handelAccept = () => {
    if (response.response_text !== '') {
      const formData = new FormData()
      setErrors("")
      axios.defaults.withCredentials = true
      try {
        formData.append('response_text', response.response_text)
        formData.append('response_pdf', response.response_pdf)
        formData.append('student_id', data.student_id)
        formData.append('ser_id', data.ser_id)
        formData.append('ser_name', data.ser_name)
        formData.append('app_id', data.app_id)
        formData.append('national_id', user.national_id)

        axios.put(`${API_URL}/manager/acceptApplicant/${user.national_id}`, formData, {
          withCredentials: true,
          onUploadProgress: (ProgressEvent) => {
            setDisabled(true)
            let percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            setProgress(prevState => ({ ...prevState, value: percentCompleted }))
          }
        })
          .then((res) => {
            setProgress(prevState => ({ ...prevState, started: false }))
            setMsg(res.data.msg)
            navigate('/manager')
          }
          ).catch((error) => {
            setDisabled(false)
            setProgress(prevState => ({ ...prevState, started: false }))
            if (error.response.status == 401)
              navigate('/ManagerLogin')
            else if (error.response.status == 400)
              setErrors(error.response.data.message)
            else
              setErrors("حدث خطأ ما")
          })
      } catch (error) {
        setDisabled(false)
        setProgress(prevState => ({ ...prevState, started: false }))
        setErrors("حدث خطأ ما")
      }

    } else {
      setErrors("يجب ادخال الرد")
    }

  }
  const handelAcceptpayment = () => {
    if (payment_code !== '') {
      const formData = new FormData()
      setErrors("")
      axios.defaults.withCredentials = true
      try {
        formData.append('payment_code', payment_code)
        formData.append('student_id', data.student_id)
        formData.append('ser_id', data.ser_id)
        formData.append('ser_name', data.ser_name)
        formData.append('app_id', data.app_id)

        axios.put(`${API_URL}/manager/Sendpayment`, formData, {
          withCredentials: true,
          onUploadProgress: (ProgressEvent) => {
            setDisabled(true)
            let percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            setProgress(prevState => ({ ...prevState, value: percentCompleted }))
          }
        })
          .then((res) => {
            setProgress(prevState => ({ ...prevState, started: false }))
            setMsg(res.data.msg)
            navigate('/manager')
          }
          ).catch((error) => {
            setDisabled(false)
            setProgress(prevState => ({ ...prevState, started: false }))
            if (error.response.status == 401)
              navigate('/ManagerLogin')
            else if (error.response.status == 400)
              setErrors(error.response.data.message)
            else
              setErrors("حدث خطأ ما")
          })
      } catch (error) {
        setDisabled(false)
        setProgress(prevState => ({ ...prevState, started: false }))
        setErrors("حدث خطأ ما")
      }

    } else {
      setErrors("يجب ادخال الرد")
    }

  }

  const handleEdit = () => {
    if (action.reason !== '') {
      try {
        const updatedAction = {
          ...action,
          student_id: dataArray[0],
          ser_id: dataArray[1],
          ser_name: dataArray[2],
          app_id: dataArray[3]
        };

        if (+user.role === 1 && (+updatedAction.ser_id !== 8 || +updatedAction.ser_id !== 7)) {
          updatedAction.column = 'manager_status';
          updatedAction.status = 3;
        } else if (+user.role === 2 && (+updatedAction.ser_id !== 8 || +updatedAction.ser_id !== 7)) {
          updatedAction.column = 'status';
          updatedAction.status = 3;
        }else if (+user.role === 1 && (+updatedAction.ser_id == 8 || +updatedAction.ser_id == 7)) {
          updatedAction.column = 'manager_status';
          updatedAction.status = 3;
        }else if (+user.role === 2 && (+updatedAction.ser_id == 8 || +updatedAction.ser_id == 7)) {
          updatedAction.column = 'status';
          updatedAction.status = 4;
        }

        if (+user.status === 0) {
          updatedAction.column = 'status';
          updatedAction.status = 4;
        }

        setAction(updatedAction);
        setConfirm(true);
        axios.defaults.withCredentials = true;

        axios
          .put(`${API_URL}/manager/acceptApplicantforManager`, updatedAction, {
            withCredentials: true
          })
          .then((res) => {
            navigate('/manager')
          })
          .catch((error) => {
            setDisabled(false);
            if (error.response && error.response.status === 401) {
              // Unauthorized, navigate to the login page
              navigate('/ManagerLogin');
            } else if (error.response && error.response.status === 400) {
              // Bad request, set the error message
              setErrors(error.response.data.msg);
            } else {
              // Other errors, set a generic error message
              setErrors('حدث خطأ ما');
            }
          });
      } catch (error) {
        setDisabled(false);
        setErrors('حدث خطأ ما');
      }
    } else {
      setErrors('يجب ادخال سبب');
    }
  };
  const handelrej = () => {
    if (action.reason !== '') {
      try {
        const updatedAction = {
          ...action,
          student_id: dataArray[0],
          ser_id: dataArray[1],
          ser_name: dataArray[2],
          app_id: dataArray[3]
        };

        if (user.role === 1) {
          updatedAction.column = 'manager_status';
          updatedAction.status = 2;
        } else if (user.role === 2) {
          updatedAction.column = 'status';
          updatedAction.status = 6;
        }

        setAction(updatedAction);
        setConfirm(true);
        axios.defaults.withCredentials = true;

        axios
          .put(`${API_URL}/manager/acceptApplicantforManager`, updatedAction, {
            withCredentials: true
          })
          .then((res) => {
            navigate('/manager')
          })
          .catch((error) => {
            setDisabled(false);
            if (error.response && error.response.status === 401) {
              navigate('/ManagerLogin');
            } else if (error.response && error.response.status === 400) {
              setErrors(error.response.data.msg);
            } else {
              setErrors('حدث خطأ ما');
            }
          });
      } catch (error) {
        setDisabled(false);
        setErrors('حدث خطأ ما');
      }
    } else {
      setErrors('يجب ادخال سبب');
    }
  };

  const handelEdit2 = () => {
    try {
      const updatedAction = {
        ...action,
        column: 'status',
        student_id: dataArray[0],
        ser_id: dataArray[1],
        ser_name: dataArray[2],
        app_id: dataArray[3]
      };

      if (+updatedAction.ser_id == 8 || +updatedAction.ser_id == 7 || +user.status === 0 ) {
        updatedAction.status = 4;
      }else if (+updatedAction.ser_id !== 8 || +updatedAction.ser_id !== 7 || +user.status === 0 ) {
        updatedAction.status = 3;
      }

      setAction(updatedAction);
      setConfirm(true);
      axios.defaults.withCredentials = true;

      axios
        .put(`${API_URL}/manager/acceptApplicantforManager`, updatedAction, {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            setDisabled(true);
            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress((prevState) => ({ ...prevState, value: percentCompleted }));
          }
        })
        .then((res) => {
          setProgress((prevState) => ({ ...prevState, started: false }));
          setMsg(res.data.msg);
          navigate('/manager');
        })
        .catch((error) => {
          setDisabled(false);
          setErrors(error.response.data.message);
          console.log(error.response.data.message);
          setProgress((prevState) => ({ ...prevState, started: false }));
          if (error.response && error.response.status === 401) {
            navigate('/ManagerLogin');
          } else if (error.response && error.response.status === 400) {
            setErrors(error.response.data.message);
          } else {
            setErrors('حدث خطأ ما');
          }
        });
    } catch (error) {
      setDisabled(false);
      setProgress((prevState) => ({ ...prevState, started: false }));
      setErrors('حدث خطأ ما');
    }
  };
  const handelrej2 = () => {
    try {
      const updatedAction = {
        ...action,
        status: 6,
        column: 'status',
        student_id: dataArray[0],
        ser_id: dataArray[1],
        ser_name: dataArray[2],
        app_id: dataArray[3]
      };

      setAction(updatedAction);
      setConfirm(true);
      axios.defaults.withCredentials = true;

      axios
        .put(`${API_URL}/manager/acceptApplicantforManager`, updatedAction, {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            setDisabled(true);
            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress((prevState) => ({ ...prevState, value: percentCompleted }));
          }
        })
        .then((res) => {
          setProgress((prevState) => ({ ...prevState, started: false }));
          setMsg(res.data.msg);
          navigate('/manager/reviewed');
        })
        .catch((error) => {
          setDisabled(false);
          setProgress((prevState) => ({ ...prevState, started: false }));
          if (error.response && error.response.status === 401) {
            navigate('/ManagerLogin');
          } else if (error.response && error.response.status === 400) {
            setErrors(error.response.data.message);
          } else {
            setErrors('حدث خطأ ما');
          }
        });
    } catch (error) {
      setDisabled(false);
      setProgress((prevState) => ({ ...prevState, started: false }));
      setErrors('حدث خطأ ما');
    }
  };
  const handelAccept2 = () => {
    try {
      const updatedAction = {
        ...action,
        status: 5,
        column: 'status',
        student_id: dataArray[0],
        ser_id: dataArray[1],
        ser_name: dataArray[2],
        app_id: dataArray[3]
      };

      setAction(updatedAction);
      setConfirm(true);
      axios.defaults.withCredentials = true;

      axios
        .put(`${API_URL}/manager/acceptApplicantforManager`, updatedAction, {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            setDisabled(true);
            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress((prevState) => ({ ...prevState, value: percentCompleted }));
          }
        })
        .then((res) => {
          setProgress((prevState) => ({ ...prevState, started: false }));
          setMsg(res.data.msg);
          navigate('/manager/reviewed');
        })
        .catch((error) => {
          setDisabled(false);
          setProgress((prevState) => ({ ...prevState, started: false }));
          if (error.response && error.response.status === 401) {
            navigate('/ManagerLogin');
          } else if (error.response && error.response.status === 400) {
            setErrors(error.response.data.message);
          } else {
            setErrors('حدث خطأ ما');
          }
        });
    } catch (error) {
      setDisabled(false);
      setProgress((prevState) => ({ ...prevState, started: false }));
      setErrors('حدث خطأ ما');
    }
  };
  const handleReturn = () => {
    try {
      const updatedAction = {
        ...action,
        status: null,
        column: 'manager_status',
        student_id: dataArray[0],
        ser_id: dataArray[1],
        ser_name: dataArray[2],
        app_id: dataArray[3],
        reason: null
      };

      setAction(updatedAction);
      setConfirm(true);
      axios.defaults.withCredentials = true;

      axios
        .put(`${API_URL}/manager/acceptApplicantforManager`, updatedAction, {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            setDisabled(true);
            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress((prevState) => ({ ...prevState, value: percentCompleted }));
          }
        })
        .then((res) => {
          setProgress((prevState) => ({ ...prevState, started: false }));
          setMsg(res.data.msg);
          navigate('/manager/reviewed');
        })
        .catch((error) => {
          setDisabled(false);
          setProgress((prevState) => ({ ...prevState, started: false }));
          if (error.response && error.response.status === 401) {
            navigate('/ManagerLogin');
          } else if (error.response && error.response.status === 400) {
            setErrors(error.response.data.message);
          } else {
            setErrors('حدث خطأ ما');
          }
        });
    } catch (error) {
      setDisabled(false);
      setProgress((prevState) => ({ ...prevState, started: false }));
      setErrors('حدث خطأ ما');
    }
  };







  return (
    <>
      <section className="cotainer-data">
        <div className="navv">
          <h2>
            بيانات الطالب
          </h2>
          <button onClick={downloadPDF} className='wait-edit'><BiSolidPrinter />طباعه</button>
        </div>
        <div className="data-container" ref={pdfRef}>
          <div className='image-con'>
            <img src={user.img ? `http://localhost:5000/${user.national_id}/${user.img}` : pimg} alt="img" className='imagee' />

            {user.manager_status == 1 && user.status !== 5 ?
              <div className='status'>
                <h2> تأكيد قبول الطلب </h2>
                <div className="atch-btns">
                  <button
                    onClick={handelAccept2}
                    className="atch-btn">تأكيد
                  </button>
                  <button
                    onClick={handleReturn}
                    className="atch-btn atch-btn2">يعود للمراجعه مره اخري
                  </button>
                </div>

              </div>
              :
              (user.manager_status == 1 && user.status == 5) || (user.manager_status == null && user.status == 5) ?
                <div className='status'>
                  <p style={{ background: "rgb(35, 175, 110)" }}> تم قبول الطلب </p>
                  <p style={{ background: "rgb(35, 175, 110)" }}>{user.response_text}</p>
                </div>
                : null
            }
            {user.manager_status == null && (user.status == 2 ||user.status == 0) ?
              <div className='status'>
                <button onClick={handleEdit} className='wait-edit'>طلب تعديل البيانات</button>
                <input
                  disabled={disabled}
                  type="text"
                  placeholder='سبب التعديل'
                  className='edit-input'
                  onChange={(e) => { setAction({ ...action, reason: e.target.value }) }}
                />

                <button onClick={handelrej} className='ref'>رفض</button>
                <input
                  disabled={disabled}
                  type="text"
                  placeholder='سبب الرفض'
                  style={{ border: '2px solid rgb(175, 35, 35)' }}
                  className='rej-input'
                  onChange={(e) => { setAction({ ...action, reason: e.target.value }) }}
                />



              </div>
              :
              (user.manager_status == 3 && user.status == 2) ?
                <div className='status'>
                  <h2> تأكيد تعديل الطلب </h2>
                  <div className="atch-btns">
                    <button
                      onClick={handelEdit2}
                      className="atch-btn">تأكيد
                    </button>
                    <button
                      onClick={handleReturn}
                      className="atch-btn atch-btn2">يعود للمراجعه مره اخري
                    </button>
                  </div>

                </div>
                :
                ((user.manager_status == 3 && user.status == 3) || (user.manager_status == null && user.status == 3)) ?
                  <div className='status'>
                    <p style={{ background: "rgb(0, 60, 112)" }}> سبب التعديل </p>
                    <p style={{ background: "rgb(0, 60, 112)" }}> {user.response_text} </p>
                  </div>
                  : null
            }
            {(user.manager_status == 2 && user.status == 2) ?
              <div className='status'>
                <h2> تأكيد رفض الطلب </h2>
                <div className="atch-btns">
                  <button
                    onClick={handelrej2}
                    className="atch-btn">تأكيد
                  </button>
                  <button
                    onClick={handleReturn}
                    className="atch-btn atch-btn2">يعود للمراجعه مره اخري
                  </button>
                </div>

              </div>
              :
              ((user.manager_status == 2 && user.status == 6) || (user.manager_status == null && user.status == 6)) ?
                <div className='status'>
                  <p style={{ background: "rgb(175, 35, 35)" }}> سبب الرفض </p>
                  <p style={{ background: "rgb(175, 35, 35)" }}> {user.response_text} </p>
                </div>
                : null
            }
            


          </div>

          <table className="data-table" style={{ direction: "rtl" }}>
            <tr>
              <th> معلومات اساسيه </th>
              <th> البيانات </th>
            </tr>

            <tr>
              <td>الاسم</td>
              <td>
                {user.name}
              </td>
            </tr>
            <tr>
              <td>الجنسيه</td>
              <td>
                {user.nationality}
              </td>
            </tr>
            <tr>
              <td>البريد الالكترونى</td>
              <td>
                {user.email}
              </td>
            </tr>
            <tr>
              <td>رقم الهاتف</td>
              <td>
                {user.phone}
              </td>
            </tr>
            <tr>
              <td>القم القومى</td>
              <td>
                {user.national_id}
              </td>
            </tr>
            <tr>
              <td>الكليه</td>
              <td>
                {user.faculity}
              </td>
            </tr>
            <tr>
              <td>القسم</td>
              <td>
                {user.department}
              </td>
            </tr>
            <tr>
              <td>تاريخ طلب كود الدفع</td>
              <td>
                {(increaseDateByOneDay(user.req_code_date ? user.req_code_date?.slice(0, 10) : null))}
              </td>
            </tr>
            <tr>
              <td>تاريخ الطلب</td>
              <td>
                {(increaseDateByOneDay(user.submit_date ? user.submit_date.slice(0, 10) : null))}
              </td>
            </tr>
            <tr>
              <td>تاريخ اخر تعديل</td>
              <td>
                {(increaseDateByOneDay(user.edit_date ? user.edit_date?.slice(0, 10) : null))}
              </td>
            </tr>
            <tr>
              <td> نوع الخدمه </td>
              <td>
                {user.service_name_ar}
              </td>
            </tr>
            <tr>
              <td>  المرحله </td>
              <td>
                {user.level == 0 ? "ماجستير" : user.level == 1 ? "دكتوراه" : null}
              </td>
            </tr>
            {user.academic &&(
            <tr>
              <td> الشعبه </td>
              <td>
                {user.academic}
              </td>
            </tr>
            )}
          </table>
        </div>

        <h1>مرفقات الطالب</h1>

        <table class="profile-table">

          <thead>
            <th>المرفقات</th>
            <th>التحكم</th>
          </thead>

          {user.photo_payment_receipt && (
            <tr>
              <td> صوره ايصال الدفع </td>
              <td className='att-row'>
                <button
                  onClick={() => { openImage(`http://localhost:5000/${user.national_id}/${user.photo_payment_receipt}`) }}
                  class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.photo_payment_receipt}`) }}
                  class="atch-btn atch-btn2">Download
                </button>

              </td>
            </tr>
          )}
          {user.photo_college_letter && (
            <tr>
              <td> {t('letter')} </td>
              <td className='att-row'>
                <button
                  onClick={() => { openImage(`http://localhost:5000/${user.national_id}/${user.photo_college_letter}`) }}
                  class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.photo_college_letter}`) }}
                  class="atch-btn atch-btn2">Download
                </button>

              </td>
            </tr>
          )}
          {user.research_plan_ar_pdf && (
            <tr>
              <td> {t('research')} </td>
              <td className='att-row'>
                <button
                  onClick={() => { openImage(`http://localhost:5000/${user.national_id}/${user.research_plan_ar_pdf}`) }}
                  class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.research_plan_ar_pdf}`) }}
                  class="atch-btn atch-btn2">Download
                </button>

              </td>
            </tr>
          )}
          {user.research_plan_ar_word && (
            <tr>
              <td>{t('research-word')}</td>
              <td className='att-row'>
                <button
                  onClick={() => { openImage(`http://localhost:5000/${user.national_id}/${user.research_plan_ar_word}`) }}
                  class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.research_plan_ar_word}`) }}
                  class="atch-btn atch-btn2">Download
                </button>

              </td>
            </tr>
          )}
          {user.research_plan_en_word && (
            <tr>
              <td> {t('research-word-en')} </td>
              <td className='att-row'>
                <button
                  onClick={() => { openImage(`http://localhost:5000/${user.national_id}/${user.research_plan_en_word}`) }}
                  class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.research_plan_en_word}`) }}
                  class="atch-btn atch-btn2">Download
                </button>

              </td>
            </tr>
          )}
          {user.research_plan_en_pdf && (
            <tr>
              <td> {t('research-en')} </td>
              <td className='att-row'>
                <button
                  onClick={() => { openImage(`http://localhost:5000/${user.national_id}/${user.research_plan_en_pdf}`) }}
                  class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.research_plan_en_pdf}`) }}
                  class="atch-btn atch-btn2">Download
                </button>

              </td>
            </tr>
          )}
          {user.translation_paper && (
            <tr>
              <td>{t('translation')}</td>
              <td className='att-row'>
                <button
                  onClick={() => { openImage(`http://localhost:5000/${user.national_id}/${user.translation_paper}`) }}
                  class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.translation_paper}`) }}
                  class="atch-btn atch-btn2">Download
                </button>

              </td>
            </tr>
          )}
          {user.message_word_ar && (
            <tr>
              <td> {t('service2-step-two.research-word')} </td>
              <td className='att-row'>
                <button
                  onClick={() => { openImage(`http://localhost:5000/${user.national_id}/${user.message_word_ar}`) }}
                  class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.message_word_ar}`) }}
                  class="atch-btn atch-btn2">Download
                </button>

              </td>
            </tr>
          )}
          {user.message_pdf_ar && (
            <tr>
              <td> {t('service2-step-two.research')} </td>
              <td className='att-row'>
                <button
                  onClick={() => { openImage(`http://localhost:5000/${user.national_id}/${user.message_pdf_ar}`) }}
                  class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.message_pdf_ar}`) }}
                  class="atch-btn atch-btn2">Download
                </button>

              </td>
            </tr>
          )}
          {user.quote_check_form && (
            <tr>
              <td> {t('service2-step-two.form')} </td>
              <td className='att-row'>
                <button
                  onClick={() => { openImage(`http://localhost:5000/${user.national_id}/${user.quote_check_form}`) }}
                  class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.quote_check_form}`) }}
                  class="atch-btn atch-btn2">Download
                </button>

              </td>
            </tr>
          )}
          {user.decision && (
            <tr>
              <td> {t('service7-step3')} </td>
              <td className='att-row'>
                <button
                  onClick={() => { openImage(`http://localhost:5000/${user.national_id}/${user.decision}`) }}
                  class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.decision}`) }}
                  class="atch-btn atch-btn2">Download
                </button>

              </td>
            </tr>
          )}
          {user.files_numbers &&
            Array.from(Array(user.files_numbers), (e, i) => (
              <React.Fragment key={i}>
                {user[`research${i + 1}_image_word`] && (
                  <tr>
                    <td> {t(`service${user.service_id}-step-two.word${i + 1}`)} </td>
                    <td className='att-row'>
                      <button
                        onClick={() => { openImage(`http://localhost:5000/${user.national_id}/${user[`research${i + 1}_image_word`]}`) }}
                        class="atch-btn">Open
                      </button>
                      <button
                        onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user[`research${i + 1}_image_word`]}`) }}
                        class="atch-btn atch-btn2">Download
                      </button>

                    </td>
                  </tr>
                )}
                {user[`research${i + 1}_image_pdf`] && (
                  <tr>
                    <td> {t(`service${user.service_id}-step-two.pdf${i + 1}`)} </td>
                    <td className='att-row'>
                      <button
                        onClick={() => { openImage(`http://localhost:5000/${user.national_id}/${user[`research${i + 1}_image_pdf`]}`) }}
                        class="atch-btn">Open
                      </button>
                      <button
                        onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user[`research${i + 1}_image_pdf`]}`) }}
                        class="atch-btn atch-btn2">Download
                      </button>

                    </td>
                  </tr>
                )}
                {user[`acceptance_letter${i + 1}`] && (
                  <>

                    <tr>
                      <td>{t(`service${user.service_id}-step-two.acceptance_letter${i + 1}`)} </td>
                      <td className='att-row'>
                        <button
                          onClick={() => { openImage(`http://localhost:5000/${user.national_id}/${user[`acceptance_letter${i + 1}`]}`) }}
                          class="atch-btn">Open
                        </button>
                        <button
                          onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user[`acceptance_letter${i + 1}`]}`) }}
                          class="atch-btn atch-btn2">Download
                        </button>

                      </td>
                    </tr>
                  </>
                )}

              </React.Fragment>
            ))
          }




        </table>
        <h1>الرد المرسل من المكتبه</h1>
        <hr style={{ width: "90%", marginBottom: "1rem", height: "3px" }} />
        <div className="resp-cont">
          <div className="resp">
            <h2><span style={{ color: "#19355A" }}>{t('date-response')} </span> : {
              (user.response_date && user.response_date !== "null") ?
                (increaseDateByOneDay(user.response_date?.slice(0, 10))) :
                "لم يتم الرد بعد"

            }</h2>
          </div>


          <div className="resp">
            <h2><span style={{ color: "#19355A" }}>{t('res-code')}</span>: {user.payment_code ? 
            user.payment_code :
            user.status == 0 ?  (
              <input
                type="text"
                name="" id=""
                placeholder='ادخل كود الدفع'
                onChange={(e) => { setPayment_code(e.target.value) }}
              />
            )
            : "لم يتم ارسال كود الدفع بعد"
          }</h2>

          </div>

          <div className="resp">
            <h2><span style={{ color: "#19355A" }}>{t('notes')}</span>
              {(user.response_text && user.response_text !== "null" && user.status !== 0) ?
                user.response_text :
                (user.manager_status === null && user.response_pdf === null && user.status == 0) ?
                  <h3>
                    لم يتم ارسال ملاحظات بعد
                  </h3>
                  :
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder='ادخل ملاحظاتك'
                    onChange={(e) => { setResponse({ ...response, response_text: e.target.value }) }}
                  />
              }
            </h2>
          </div>
          <div className="resp">

            <div className='inputt-atch'>
              {(user.response_pdf !== null) && user.status !== 0 ?
                (<div className="atch-btns">
                  <button
                    onClick={() => { openImage(`http://localhost:5000/${user.national_id}/${user.response_pdf}`) }}
                    className="atch-btn">Open
                  </button>
                  <button
                    onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.response_pdf}`) }}
                    className="atch-btn atch-btn2">Download
                  </button>
                </div>) :
                (user.manager_status === null && user.response_pdf === null && user.status !== 0) ? (
                  <div className="select-img">
                    <label className='upload-image' htmlFor="upload-image">
                      <BiImageAdd className='img-icom' />
                      <p>{t('click-here')}</p>
                    </label>
                    <input type="file"
                      hidden
                      id='upload-image'
                      name='upload-image'
                      onChange={(e) => { setResponse({ ...response, response_pdf: e.target.files[0] }) }}
                    />
                    {response.response_pdf &&
                      <div>
                        <p className='upload-image value'>
                          {response.response_pdf.name ? response.response_pdf.name : response.response_pdf}
                        </p>
                        <button className='upload-image openPdf'
                          onClick={() => {
                            window.open(URL.createObjectURL(response.response_pdf))
                          }}
                        >{t('open')}</button>
                        <AiFillCloseCircle
                          onClick={() => { setResponse({ ...response, response_pdf: '' }) }}
                          style={{ color: '#ad8700', fontSize: '2rem', cursor: 'pointer' }} />

                      </div>
                    }
                  </div>
                ) : ((user.manager_status !== null && user.response_pdf === null) || user.status == 0) ? (
                  <h3>
                    لم يتم ارسال ملف الرد بعد
                  </h3>

                ) : null

              }
              <h2><span style={{ color: "#19355A" }}>{t('att-res')}</span> </h2>

            </div>

          </div>


          <div className="progress">
            {progress.started && <progress max="100" value={progress.value}></progress>}
            {msg && <p>{msg}</p>}
          </div>
          {response.response_pdf || response.response_text ? (
            <div className="resp two">
              <button
                disabled={disabled}
                className='atch-btn atch-btn2'
                style={{ width: "50%" }}
                onClick={handelAccept}
              >
                ارسال
              </button>
            </div>
          ) : null}
          {payment_code && user.status == 0? (
            <div className="resp two">
              <button
                disabled={disabled}
                className='atch-btn atch-btn2'
                style={{ width: "50%" }}
                onClick={handelAcceptpayment}
              >
                ارسال كود الدفع
              </button>
            </div>
          ) : null}
        </div>

      </section>
      {errors && <PopupErrorMsg message={errors} onClose={handleCloseError} />}

    </>
  )
}

export default ShowA