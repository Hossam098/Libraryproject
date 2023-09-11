import React, { useState, useEffect } from 'react';
import './slider.css'
import { BsFillBarChartFill } from "react-icons/bs"

const Slider = () => {

    const [isExpanded, setExpanded] = useState(true)
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
          if(window.innerWidth < 768){
            setExpanded(false)
          } // Adjust the breakpoint as needed
        };
    
        handleResize(); // Check initial width
    
        window.addEventListener('resize', handleResize); // Add event listener for window resize
    
        return () => {
          window.removeEventListener('resize', handleResize); // Cleanup the event listener
        };
      }, []);


  return (
    
    <div className={isExpanded ? "side-nav-container" : "side-nav-container side-nav-container-NO"}>
    <div className="nav-upper">

        <div className="nav-heading">
            {isExpanded && (
                <div className="nav-logo">
                    < BsFillBarChartFill className='icon' />
                    <h2>المخططات</h2>
                </div>
            )}
            <button
                className={isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"}
                onClick={() => { setExpanded(!isExpanded) }}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>

    <div className="charts">
        
    </div>
</div>
  )
}

export default Slider