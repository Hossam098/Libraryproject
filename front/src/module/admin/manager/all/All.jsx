import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import img from "../../../../images/librarylog.jpg";
import { API_URL } from "../../../../config";

const Reviewed = () => {
  const navigate = useNavigate();
  const [student, setStudent] = React.useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');


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
          if (error.response.status === 401) navigate("/Library/ManagerLogin");
          navigate("/Library/ManagerLogin");
        });
    } catch (error) { }
  }, []);

  const [filter, setFilter] = useState(student);
  const [filter2, setFilter2] = useState(student);



  return (
    <div className="super-container">
      <img src={img} alt="img" />

      <section className="cotainer-stu">
        <div className="navv">
          <h2>الطلاب</h2>
          <select
            onChange={(e) => {
              const filteredStudents =
                e.target.value === ""
                  ? student
                  : student.filter(
                    (item) => item.status === parseInt(e.target.value)
                  );
              setFilter(filteredStudents);
              setFilter2(filteredStudents);
            }}
            className="filter"
            name=""
            id=""
          >
            <option value="">فلتره</option>
            {(student[0]?.status === 0 || student[0]?.status === 4) && (
              <>
                <option value="0"> منظر كود دفع </option>
                <option value="4"> قيد التعديل </option>
              </>
            )}
            {student[0]?.status !== 0 && student[0]?.status !== 4 && (
              <>
                <option value="2"> قيد الانتظار </option>
                <option value="3"> قيد التعديل </option>
                <option value="5"> مقبول </option>
                <option value="6"> مرفوض </option>
              </>
            )}
          </select>
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
                  <th>تاريخ التقديم</th>
                  <th> حاله الخدمه </th>
                </tr>
              </thead>
              <tbody>
                {filter.length > 0 &&
                  filter
                    .filter((item) => {
                      const submitDate = new Date(item.submit_date); // Assuming submit_date is in a date format
                      const fromDateObj = new Date(fromDate);
                      const toDateObj = new Date(toDate);

                      // Check if submitDate is within the selected date range (if dates are selected)
                      if (
                        (!fromDateObj || submitDate >= fromDateObj) &&
                        (!toDateObj || submitDate <= toDateObj)
                      ) {
                        return true;
                      }

                      // If no date range is selected, display all data
                      if (!fromDate && !toDate) {
                        return true;
                      }

                      return false;
                    }).map((item, index) => (
                      <tr key={item.student_id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.service_name_ar}</td>
                        <td>
                          {item.status === 0 || item.status === 4
                            ? item.req_code_date?.slice(0, 10)
                            : item.submit_date?.slice(0, 10)}
                        </td>
                        <td>
                          {item.status === 0
                            ? "منتظر كود دفع"
                            : item.status === 1
                              ? "في انتظار رفع المرفقات"
                              : item.status === 2
                                ? "في انتظار رد المكتبه"
                                : item.status === 3
                                  ? "قيد التعديل"
                                  : item.status === 4
                                    ? "قيد التعديل"
                                    : item.status === 5
                                      ? "مقبول"
                                      : item.status === 6
                                        ? "مرفوض"
                                        : null}
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

export default Reviewed;
