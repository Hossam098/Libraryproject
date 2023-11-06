import React, { useEffect, useState } from "react";
import "./charts.css";
import { AiOutlineUser } from "react-icons/ai";
import Slider from "../../../../components/Slider/Slider";
import { BarChart } from "@mui/x-charts/BarChart";
import { API_URL } from "../../../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Charts = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [filter, setfilter] = useState([]);
  const navigate = useNavigate();

  // const [service, setfilter] = useState([])
  useEffect(() => {
    axios.defaults.withCredentials = true;
    try {
      axios
        .get(`${API_URL}/admin/getallApplicants`, { withCredentials: true })
        .then((res) => {
          setfilter(res.data);
          setFilter2(res.data);
        })
        .catch((error) => {
          if (error.response.status === 401) window.location.replace("/Library/AdminLOgin");
          window.location.replace("/Library/AdminLOgin");
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const [filter2, setFilter2] = useState(filter);
  return (
    <div className="chart-Grid">
      <div className="filter">
        <Slider
          filter={filter}
          setfilter={setfilter}
          filter2={filter2}
          setfilter2={setFilter2}
        />
      </div>
      <div className="charts">
        <div className="widget_container">
          <article className="widget">
            <div className="widget-header">
              <AiOutlineUser />
              <p>عدد المستخدمين</p>
            </div>
            <h2>{filter2?.length}</h2>
          </article>
          <article className="widget">
            <div className="widget-header">
              <AiOutlineUser />
              <p>عدد المقبولين</p>
            </div>
            <h2>
              {filter?.length >= 0 &&
                filter?.length >= 0 &&
                filter2?.filter((item) => +item.status == 5).length}
            </h2>
          </article>
          <article className="widget">
            <div className="widget-header">
              <AiOutlineUser />
              <p>عدد المرفوضين</p>
            </div>
            <h2>
              {filter?.length >= 0 &&
                filter2?.filter((item) => +item.status == 6).length}
            </h2>
          </article>

          <article className="widget">
            <div className="widget-header">
              <AiOutlineUser />
              <p>عدد الموجودين ب قائمه انتظار كود </p>
            </div>
            <h2>
              {filter?.length >= 0 &&
                filter2?.filter((item) => +item.status == 0).length}
            </h2>
          </article>
          <article className="widget">
            <div className="widget-header">
              <AiOutlineUser />
              <p> عدد الحاصلين على كود دفع </p>
            </div>
            <h2>
              {filter?.length >= 0 &&
                filter2?.filter((item) => +item.status == 1).length}
            </h2>
          </article>

          <article className="widget">
            <div className="widget-header">
              <AiOutlineUser />
              <p>عدد الموجودين ب قائمه الانتظار</p>
            </div>
            <h2>
              {filter?.length >= 0 &&
                filter2?.filter((item) => +item.status == 2).length}
            </h2>
          </article>

          <article className="widget">
            <div className="widget-header">
              <AiOutlineUser />
              <p>عدد الموجودين ب قائمه التعديل</p>
            </div>
            <h2>
              {filter?.length >= 0 &&
                filter2?.filter((item) => +item.status == 3).length}
            </h2>
          </article>

          <article className="widget">
            <div className="widget-header">
              <AiOutlineUser />
              <p>قائمه التعديل على مرفقات كود الدفع</p>
            </div>
            <h2>
              {filter?.length >= 0 &&
                filter2?.filter((item) => +item.status == 4).length}
            </h2>
          </article>
        </div>
        <div className="chart" style={{ width: "100%" }}>
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: [
                  "خدمه المنح",
                  " خدمه التشكيل ",
                  "خدمه الترقيه",
                  " خدمه التسجيل ",
                  " فحص احسن رساله علميه ",
                  " الفحص الشخصي ",
                  " فحص النشر ",
                  "بنك المعرفه",
                ],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: [
                  filter?.length >= 0 &&
                    filter?.filter((item) => item.ser_grant).length,
                  filter?.length >= 0 &&
                    filter?.filter((item) => item.ser_formation).length,
                  filter?.length >= 0 &&
                    filter?.filter((item) => item.ser_upgrade).length,
                  filter?.length >= 0 &&
                    filter?.filter((item) => item.ser_reg).length,
                  filter?.length >= 0 &&
                    filter?.filter((item) => item.ser_best).length,
                  filter?.length >= 0 &&
                    filter?.filter((item) => item.ser_personal).length,
                  filter?.length >= 0 &&
                    filter?.filter((item) => item.ser_magazine).length,
                  filter?.length >= 0 &&
                    filter?.filter((item) => item.ser_knowledge).length,
                ],
              },
            ]}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default Charts;
