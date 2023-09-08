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


const ShowA = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  console.log(id)
  const pdfRef = useRef()
  const [rejRes, SetRejRes] = useState("")

  const dataArray = id.split(",");

  const [data, SetData] = useState({
    student_id: dataArray[0],
    ser_id: dataArray[1],
    ser_name: dataArray[2],
    app_id: dataArray[3]
  })
  console.log(data)


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

  const [status, setStatus] = useState('')
  const handelAccept = () => {
    // try {
    //   axios.put('http://localhost:5000/admin/updatestatus/' + id, { status: 4 }, { withCredentials: true })
    //     .then((res) => {
    //       window.location.reload()
    //     }).catch((error) => {
    //       console.log(error.response)

    //     })
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const handelrej = () => {
    if (rejRes !== "") {


      try {
        axios.put('http://localhost:5000/admin/updatestatus/' + id, { status: 5, comment: rejRes }, { withCredentials: true })
          .then((res) => {
            window.location.reload()
          }).catch((error) => {
            console.log(error.response)
          })
      } catch (error) {
        console.log(error)
      }
    } else {
      alert("يجب ادخال سبب الرفض")
    }
  }





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
            <img src={user.img?`http://localhost:5000/${user.national_id}/${user.img}`:pimg} alt="img" className='imagee' />
            {user.status == 5 ? (
              <>
                <p style={{ background: "rgb(175, 35, 35)" }}>مرفوض من الجامعه</p>
                <h2>سبب الرفض</h2>
                <p style={{ background: "rgb(175, 35, 35)" }}>{user.comment}</p>
              </>
            )
              : user.status == 4 ? <p >مقبول من الجامعه</p>
                : user.status == 1 ?
                  <>
                    <button onClick={handelAccept} className='acc'>قبول</button>




                    <button onClick={handelrej} className='ref'>رفض</button>
                    <input
                      type="text"
                      placeholder='سبب الرفض'
                      value={rejRes}
                      onChange={(e) => { SetRejRes(e.target.value) }}
                    />
                  </>
                  : null
            }
          </div>

          <table className="data-table" style={{direction:"rtl"}}>
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
              <td>تاريخ الطلب</td>
              <td>
                {(user.submit_date?.split('T')[0]) || ''}
              </td>
            </tr>
            <tr>
              <td> نوع الخدمه </td>
              <td>
                {user.service_name_ar}
              </td>
            </tr>
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
                  style={{ background: "#19355A" }} class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.photo_payment_receipt}`) }}
                  style={{ background: "#AD8700" }} class="atch-btn">Download
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
                  style={{ background: "#19355A" }} class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.photo_college_letter}`) }}
                  style={{ background: "#AD8700" }} class="atch-btn">Download
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
                  style={{ background: "#19355A" }} class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.research_plan_ar_pdf}`) }}
                  style={{ background: "#AD8700" }} class="atch-btn">Download
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
                  style={{ background: "#19355A" }} class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.research_plan_ar_word}`) }}
                  style={{ background: "#AD8700" }} class="atch-btn">Download
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
                  style={{ background: "#19355A" }} class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.research_plan_en_word}`) }}
                  style={{ background: "#AD8700" }} class="atch-btn">Download
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
                  style={{ background: "#19355A" }} class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.research_plan_en_pdf}`) }}
                  style={{ background: "#AD8700" }} class="atch-btn">Download
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
                  style={{ background: "#19355A" }} class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.translation_paper}`) }}
                  style={{ background: "#AD8700" }} class="atch-btn">Download
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
                  style={{ background: "#19355A" }} class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.message_word_ar}`) }}
                  style={{ background: "#AD8700" }} class="atch-btn">Download
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
                  style={{ background: "#19355A" }} class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.message_pdf_ar}`) }}
                  style={{ background: "#AD8700" }} class="atch-btn">Download
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
                  style={{ background: "#19355A" }} class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.quote_check_form}`) }}
                  style={{ background: "#AD8700" }} class="atch-btn">Download
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
                  style={{ background: "#19355A" }} class="atch-btn">Open
                </button>
                <button
                  onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.decision}`) }}
                  style={{ background: "#AD8700" }} class="atch-btn">Download
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
                        style={{ background: "#19355A" }} class="atch-btn">Open
                      </button>
                      <button
                        onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user[`research${i + 1}_image_word`]}`) }}
                        style={{ background: "#AD8700" }} class="atch-btn">Download
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
                        style={{ background: "#19355A" }} class="atch-btn">Open
                      </button>
                      <button
                        onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user[`research${i + 1}_image_pdf`]}`) }}
                        style={{ background: "#AD8700" }} class="atch-btn">Download
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
                          style={{ background: "#19355A" }} class="atch-btn">Open
                        </button>
                        <button
                          onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user[`acceptance_letter${i + 1}`]}`) }}
                          style={{ background: "#AD8700" }} class="atch-btn">Download
                        </button>

                      </td>
                    </tr>
                  </>
                )}

              </React.Fragment>
            ))
          }




        </table>
        <hr style={{ width: "90%", marginTop:"1rem", height:"3px" }} />
        <h1>الرد المرسل من المكتبه</h1>
        <div className="resp-cont">
          <div className="resp">
          <h2><span style={{ color: "#AD8700" }}>{t('date-response')} </span> : {(user.response_date?.split('T')[0]) || '' }</h2>
          </div>


          <div className="resp">
          <h2><span style={{ color: "#AD8700" }}>{t('res-code')}</span>: {user.payment_code ? user.payment_code : (
            <input type="text" name="" id="" />
          )}</h2>

          </div>
          <div className="resp">
          <h2><span style={{ color: "#AD8700" }}>{t('notes')}</span> : {user.response_text}</h2>
          </div>
          <div className="resp">
          <div className='inputt-atch' style={{ justifyContent: "space-evenly" }}>
                        <h2>{t('att-res')}</h2>
                        <div className="atch-btns">
                            <button
                                className="atch-btn-open"
                                onClick={() => { openImage(`http://localhost:5000/${user.national_id}/${user.response_pdf}`) }}
                                style={{ background: "#19355A" }} class="atch-btn">{t('open')}
                            </button>
                            <button
                                onClick={() => { downloadImage(`http://localhost:5000/${user.national_id}/${user.response_pdf}`) }}
                                style={{ background: "#AD8700" }} class="atch-btn">{t('download')}
                            </button>
                        </div>
                    </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default ShowA