import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import img from "../../../../images/librarylog.jpg";
import { API_URL } from "../../../../config";
import PopupConfirmMsg from "../../../../components/error/PopupConfirmMsg";
import PopupErrorMsg from "../../../../components/error/PopupErrorMsg";

const AllToCode = () => {
  const navigate = useNavigate();
  const [student, setStudent] = React.useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [admins, setAdmins] = React.useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  localStorage.setItem("i18nextLng", "ar");

  useEffect(() => {
    try {
      axios.defaults.withCredentials = true;
      axios
        .get(`${API_URL}/manager/getallApplicants`, { withCredentials: true })
        .then((res) => {
          setStudent(res?.data?.length > 0 && res?.data?.filter((item) => item.service_id !== 7 && item.service_id !== 8));
          setFilter(res?.data?.length > 0 && res?.data?.filter((item) => item.service_id !== 7 && item.service_id !== 8));
          setFilter2(res.data);

        })
        .catch((error) => {
          if (error.response.status === 401) window.location.replace("/Library/ManagerLogin");
          window.location.replace("/Library/ManagerLogin");
        });
      axios
        .get(`${API_URL}/manager/getAllManagers`, { withCredentials: true })
        .then((res) => {
          setAdmins(res.data);
          // setFilter(res.data)
          // setFilter2(res.data)
        })
        .catch((error) => {
          if (error.response.status === 401) window.location.replace("/Library/ManagerLogin");
          window.location.replace("/Library/ManagerLogin");
        });
    } catch (error) { }
  }, []);

  const [filter, setFilter] = useState(student);
  const [filter2, setFilter2] = useState(student);

  const format = (date) => {
    const formattedDate = new Date(date).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // Extract components from formattedDate
    const [, day, month, year, time] = /(\d+)\/(\d+)\/(\d+), (.+)/.exec(formattedDate);

    // Convert time to 12-hour format with AM/PM
    const [hour, minute, second] = time.split(':');
    const amPm = hour >= 12 ? 'مساءً' : 'صباحا';
    const formattedTime = `${(hour % 12) || 12}:${minute}:${second} ${amPm}`;

    // Combine components to create the final formatted date
    const formattedDateTime = `${day}/${month}/${year}, ${formattedTime}`;

    return formattedDateTime;
  };


  const sername = (item) => {
    const ser_name =
      item.ser_reg !== null
        ? "ser_reg"
        : item.ser_formation !== null
          ? "ser_formation"
          : item.ser_grant !== null
            ? "ser_grant"
            : item.ser_personal !== null
              ? "ser_personal"
              : item.ser_upgrade !== null
                ? "ser_upgrade"
                : item.ser_knowledge !== null
                  ? "ser_knowledge"
                  : item.ser_magazine !== null
                    ? "ser_magazine"
                    : item.ser_best !== null
                      ? "ser_best"
                      : null;

    return ser_name;
  };
  const app_id = (item) => {
    const appid =
      item.ser_reg !== null
        ? item.ser_reg
        : item.ser_formation !== null
          ? item.ser_formation
          : item.ser_grant !== null
            ? item.ser_grant
            : item.ser_personal !== null
              ? item.ser_personal
              : item.ser_upgrade !== null
                ? item.ser_upgrade
                : item.ser_knowledge !== null
                  ? item.ser_knowledge
                  : item.ser_magazine !== null
                    ? item.ser_magazine
                    : item.ser_best !== null
                      ? item.ser_best
                      : null;

    return appid;
  };
  const handleDelete = async () => {
    setConfirmDelete(false);
    let student_info = data;
    if ((student_info.status == 6 || student_info.status == 1 || student_info.status == 0 || student_info.status == 2) &&
      (student_info.payment_code == null || student_info.payment_code == '')) {

        console.log(student_info.status);
        console.log(student_info.payment_code);

      axios
        .post(`${API_URL}/manager/deleteApplicant`, {
          student_info,
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          if (err.response.status === 401) window.location.replace("/Library/ManagerLogin");
          window.location.replace("/Library/manager");
        });
    } else {
      setError('لا يمكن حذف هذا الطلب الان');
      return;
    }
  };

  const handleCloseError = () => {
    setConfirmDelete(false);
    setError('');
  }

  return (
    <div className="super-container">
      <img src={img} alt="img" />
      {confirmDelete && (
        <PopupConfirmMsg
          message={"هل انت متاكد من حذف هذا الطلب؟"}
          onClose={handleCloseError}
          onSubmit={handleDelete}
        />
      )}
      {error && (
        <PopupErrorMsg
          message={error}
          onClose={handleCloseError}
        />
      )}
      <section className="cotainer-stu">
        <div className="navv">
          {/* <h2>الطلاب</h2> */}
          <select
            onChange={(e) => {
              const value = e.target.value;
              const filteredStudents =
                student.filter((item) => {
                  if (value === "1" && item.payment_code !== null && item.payment_code !== "") {
                    return item.status >= 1;
                  } else if (value === "" && item.service_id !== 7 && item.service_id !== 8) {
                    return item.service_id !== 7 && item.service_id !== 8;
                  } else if (value === "6" && item.payment_code === null) {
                    return item.status === 6;
                  }
                  else {
                    return item.status === parseInt(value);
                  }
                });

              setFilter(filteredStudents);
              setFilter2(filteredStudents);
            }}

            className="filter"
            name=""
            id=""
          >
            <option value="" defaultValue>الكل</option>
            <option value="0"> منظر كود دفع </option>
            <option value="4"> قيد التعديل </option>
            <option value="1"> حصل علي كود دفع </option>
            <option value="6"> تم الغاء الطلب </option>
          </select>

          <input
            type="text"
            style={{ textAlign: "center" }}
            placeholder="بحث"
            onChange={(e) => {
              const searchText = e.target.value;
              const filteredStudents = searchText === ""
                ? student
                : student.filter((item) => {
                  return (item.name && item.name.includes(searchText)) ||
                    (+item.national_id && +item.national_id.includes(searchText));
                });
              setFilter(filteredStudents);
              setFilter2(filteredStudents);
            }}
          />



          <div className="date-input">
            <label htmlFor="fromDate">من تاريخ</label>
            <input
              id="fromDate"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="date-input">
            <label htmlFor="toDate">الي تاريخ</label>
            <input
              id="toDate"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

        </div>
        <div className="student-container">
          {/* {student  && <h2>{student}</h2>} */}
          {filter.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>التسلسل</th>
                  <th>اسم الطالب</th>
                  <th> نوع الخدمه </th>
                  <th>تاريخ الحصول علي كود الدفع </th>
                  <th> حاله الخدمه </th>
                  <th>التفاصيل</th>
                </tr>
              </thead>
              <tbody>
                {filter.length > 0 &&
                  filter.filter((item) => {
                    const submitDate = new Date(item.req_code_date); // Assuming submit_date is in a date format
                    const fromDateObj = new Date(fromDate);
                    const toDateObj = new Date(toDate);


                    // Check if submitDate is within the selected date range (if dates are selected)
                    if (
                      (!fromDateObj || submitDate >= fromDateObj) &&
                      (!toDateObj || submitDate <= toDateObj)
                    ) {
                      return true;
                    }

                    // If no date range is selected, display all data if submitDate is valid
                    if (!fromDate && !toDate && !isNaN(submitDate.getTime())) {
                      return true;
                    }

                    return false;

                  }).map((item, index) => (
                    <tr key={item.student_id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.service_name_ar}</td>
                      <td>
                        {item.req_code_date ? format(item.req_code_date) : null}
                      </td>
                      <td>
                        {item.status === 0 ? "منتظر كود دفع"
                          : item.status === 4 ? "قيد التعديل"
                            : item.status >= 1 && item.payment_code !== null && item.payment_code !== "" ? "حصل علي كود دفع"
                              : item.status === 6 && item.payment_code === null ? "تم الغاء الطلب"
                                : null}
                      </td>
                      <td style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>

                        <button
                          onClick={() => {
                            navigate(
                              `/Library/manager/ShowOnly/${item.user_id},${item.service_id
                              },${sername(item)},${app_id(item)}`
                            );
                          }}
                        >
                          {/* <Link to={`/manager/show/${item.user_id},${item.service_id},${sername(item)},${app_id(item)}`}> */}
                          تفاصيل
                          {/* </Link> */}
                        </button>
                        <button
                          className="delete"
                          onClick={() => {
                            setData(item);
                            setConfirmDelete(true);
                            // handleDelete(item);
                          }}
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <h2 style={{ marginBottom: "1rem" }}>لا يوجد طلبات بعد</h2>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllToCode;
