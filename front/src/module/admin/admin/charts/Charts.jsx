import React, { useState } from 'react';
import './charts.css'
import {BsFillBarChartFill} from "react-icons/bs"
import Slider from '../../../../components/Slider/Slider';

const Charts = () => {

  const  [isExpanded, setExpanded] = useState(false) 


  return (
    <div className='chart-Grid'>
      <div className="filter">
        <Slider/>
      </div>
      <div className="charts">
        {/* Chart content */}
      </div>
    </div>
  );
};

export default Charts;