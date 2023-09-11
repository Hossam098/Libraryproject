import React, { useState } from 'react';
import './charts.css'
import { AiOutlineUser } from "react-icons/ai"
import Slider from '../../../../components/Slider/Slider';
import { BarChart } from '@mui/x-charts/BarChart';

const Charts = () => {

  const [isExpanded, setExpanded] = useState(false)


  return (
    <div className='chart-Grid'>
      <div className="filter">
        <Slider />
      </div>
      <div className="charts">
        <div className="widget_container">
          <article className="widget">
            <div className="widget-header">
              <AiOutlineUser />
              <p>عدد المستخدمين</p>
            </div>
            <h2>23,400</h2>
          </article>
          <article className="widget">
            <div className="widget-header">
              <AiOutlineUser />
              <p>عدد المقبولين</p>
            </div>
            <h2>23,443</h2>
          </article>
          <article className="widget">
            <div className="widget-header">
              <AiOutlineUser />
              <p>عدد المرفوضين</p>
            </div>
            <h2>13,423</h2>
          </article>
          <article className="widget">
            <div className="widget-header">
              <AiOutlineUser />
              <p>عدد الموجودين ب قائمه الانتظار</p>
            </div>
            <h2>25,423</h2>
          </article>
          <article className="widget">
            <div className="widget-header">
              <AiOutlineUser />
              <p>عدد الموجودين ب قائمه التعديل</p>
            </div>
            <h2>25,423</h2>
          </article>
        </div>
        <div className="chart" style={{ width: '100%' }}>
          <BarChart
            xAxis={[
              {
                id: 'barCategories',
                data: ['خدمه المنح', ' خدمه التشكيل ', 'خدمه الترقيه', ' خدمه التسجيل ', ' فحص احسن رساله علميه ', ' الفحص الشخصي ', ' فحص النشر '],
                scaleType: 'band',
              },
            ]}
            series={[
              {
                data: [220, 120, 300, 80, 130, 266, 190],
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