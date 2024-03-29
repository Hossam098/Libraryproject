import React, { useEffect } from "react";
import "./studentlist.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../../../../config";
import img from "../../../../images/librarylog.jpg";
import PopupConfirmMsg from "../../../../components/error/PopupConfirmMsg";

const StudentListadmin = () => {
  const navigate = useNavigate();
  const [student, setStudent] = React.useState([]);
  const [admins, setAdmins] = React.useState([]);
  const [managerid, setmanagerid] = React.useState("");
  const [role, setRole] = React.useState("");
  const [confirm, setConfirm] = useState(false);

  localStorage.setItem("i18nextLng", "ar");

  useEffect(() => {
    try {
      axios.defaults.withCredentials = true;
      axios
        .get(`${API_URL}/manager/getallApplicantsWaiting`, {
          withCredentials: true,
        })
        .then((res) => {
          setStudent(res.data);
          // setFilter(res.data)
          // setFilter2(res.data)
        })
        .catch((error) => {
          if (error.response.status === 401) window.location.replace("/Library/ManagerLogin");
          window.location.replace("/Library/ManagerLogin");
        });

      axios
        .get(`${API_URL}/manager/getAllManagersToAssign`, { withCredentials: true })
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

  // const [filter, setFilter] = useState(student);
  // const [filter2, setFilter2] = useState(student);

  const [selected, setSelected] = useState([]);
  const [deleted, setDeleted] = useState({
    student_id: "",
    managerid: "",
    service_id: "",
    ser_name: "",
    aplecationId: "",
  });

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const handleUpdate = () => {
    try {
      axios.defaults.withCredentials = true;
      axios
        .put(`${API_URL}/manager/AssignManager`, selected, {
          withCredentials: true,
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.response);
        });
    } catch (error) { }
  };

  const handleDelete = (item) => {
    const updatedDeleted = {
      ...deleted,
      student_id: item.user_id,
      service_id: item.service_id,
      aplecationId:
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
                        : null,
      ser_name:
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
                        : null,
    };

    setDeleted(updatedDeleted);

    axios
      .put(`${API_URL}/manager/deleteManager`, updatedDeleted, {
        withCredentials: true,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
      });
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

  return (
    <div className="super-container">
      <img src={img} alt="img" />
      {confirm && (
        <PopupConfirmMsg
          message="تأكيد اختيار الموظف"
          onClose={() => setConfirm(false)}
          onSubmit={handleUpdate}
        />
      )}

      <section className="cotainer-stu">
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
            className="filter"
            name=""
            id=""
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option value="">الصلاحيات</option>

            <option value="1"> مراجعه فقط </option>
            <option value="2"> تحكم كامل </option>
          </select>
          <select
            className="filter"
            name=""
            id=""
            onChange={(e) => {
              setmanagerid(e.target.value);
            }}
          >
            <option value="">اختر الادمن</option>
            {admins.map((admin) => (
              <option value={admin.id} key={admin.id}>
                {admin.mname}
              </option>
            ))}
          </select>
          {selected.length > 0 && (
            <button
              style={{ width: "20%" }}
              onClick={() => {
                setConfirm(true);
              }}
            >
              تأكيد
            </button>
          )}
        </div>
        <div className="student-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>التسلسل</th>
                <th>اسم الطالب</th>
                <th> نوع الخدمه </th>
                <th>تاريخ التقديم</th>
                <th> حاله الخدمه </th>
                <th>الصلاحيات</th>
                <th> الموظف</th>
              </tr>
            </thead>
            <tbody>
              {student.length > 0 &&
                student.map(
                  (item, index) =>
                    !item.admin_id && (
                      <tr key={item.student_id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.service_name_ar}</td>
                        <td>
                          {item.status === 0
                            ? format(item.req_code_date)
                            : format(item.submit_date)}
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
                                      ? "تم الارسال"
                                      : item.status === 6
                                        ? "مرفوض"
                                        : null}
                        </td>
                        {item.role !== null && item.role !== "" ? (
                          <td>
                            {item.role === 1
                              ? "مراجعه فقط"
                              : item.role === 2
                                ? "تحكم كامل"
                                : null}
                          </td>
                        ) : (
                          <td> لم يتم تعين صلاحيات للموطف </td>
                        )}

                        {(managerid && role && item.role == null) ||
                          item.role == "" ? (
                          <td>
                            <input
                              onClick={(e) => {
                                if (e.target.checked) {
                                  setSelected((prev) => [
                                    ...prev,
                                    {
                                      student_id: item.user_id,
                                      managerid: managerid,
                                      service_id: item.service_id,
                                      aplecationId:
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
                                                        : null,
                                      role: role,
                                      ser_name:
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
                                                        : null,
                                    },
                                  ]);
                                } else {
                                  setSelected((prev) =>
                                    prev.filter(
                                      (selectedItem) =>
                                        selectedItem.student_id !==
                                        item.user_id ||
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
                          </td>
                        ) : item.role !== null && item.role !== "" ? (
                          admins
                            .filter((admin) => admin.id === item.manager_id)
                            .map((admin) => <td>{admin.mname}</td>)
                        ) : (
                          <>
                            <td>لا يوجد موظف</td>
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
                          </>
                        )}
                        {item.role !== null && item.role !== "" ? (
                          <td>
                            <button
                              className="delete"
                              onClick={() => handleDelete(item)}
                            >
                              ازالة الموظف
                            </button>
                          </td>
                        ) : null}
                      </tr>
                    )
                )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default StudentListadmin;
