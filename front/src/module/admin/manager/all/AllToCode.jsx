import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import img from "../../../../images/librarylog.jpg";
import { API_URL } from "../../../../config";

const AllToCode = () => {
  const navigate = useNavigate();
  const [student, setStudent] = React.useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [admins, setAdmins] = React.useState([]);


  localStorage.setItem("i18nextLng", "ar");

  useEffect(() => {
    try {
      axios.defaults.withCredentials = true;
      axios
        .get(`${API_URL}/manager/getallApplicants`, { withCredentials: true })
        .then((res) => {
          setStudent(res.data);
          setFilter(res.data);
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


  return (
    <div className="super-container">
      <img src={img} alt="img" />

      <section className="cotainer-stu">
        <div className="navv">
          {/* <h2>الطلاب</h2> */}
          <select
            onChange={(e) => {
              const value = e.target.value;
              const filteredStudents =
                value === ""
                  ? student
                  : student.filter((item) => {
                    if (value === "1") {
                      return item.status >= 1;
                    } else {
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
            <option value="">فلتره</option>
            <option value="0"> منظر كود دفع </option>
            <option value="4"> قيد التعديل </option>
            <option value="1"> حصل علي كود دفع </option>
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
                        {item.req_code_date?.slice(0, 10)}
                      </td>
                      <td>
                        {item.status === 0
                          ? "منتظر كود دفع"
                          : item.status === 4
                            ? "قيد التعديل"
                            : " حصل علي كود دفع "}
                      </td>
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
