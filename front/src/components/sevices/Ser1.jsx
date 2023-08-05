import React, { useState } from 'react'
import {BiImageAdd} from 'react-icons/bi'
import './ser.css'

const Ser1 = () => {
    const [data, setData] = useState({
        level: "",
        image: ""
    })


    const handleSubmit =()=>{
        alert("done")
    }

  return (
    <div className='req'>
        <div className="input">
            <select 
                name=""
                id=""
                value={data.level}
                onChange={(e) => { setData({ ...data, level: e.target.value }) }} 
            >
                <option value="">level</option>
                <option value="0">master's</option>
                <option value="1">doctor</option>
            </select>
            <div className="select-img">
                <span className="title-upload">
                Graduate letter
                </span>
                <label className='upload-image' htmlFor="upload-image">
                    <BiImageAdd className='img-icom'/>
                    <p>add image</p>
                </label>
                <input type="file" 
                 hidden
                 id='upload-image'
                 name='upload-image'
                />
            </div>
        </div>
        <input 
            type="submit" 
            value="submit now"
            onClick={handleSubmit}
        />
    </div>
  )
}

export default Ser1