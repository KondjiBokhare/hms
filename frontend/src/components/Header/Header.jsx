import React, { useState,useEffect } from 'react'
import './Header.css'
import { SlCalender } from "react-icons/sl";

const Header = (props) => {
    
    const [date, setDate] = useState(''); 

    useEffect(() => {
        const getDate = ()=>{
            const date = new Date();
            return date.toDateString();
        }
        setDate(getDate()); 
    }, [])
    
  return (
    <div className="header">
        <div className="pagename">
            <h2>{props.pagename}</h2>
        </div>
        <div className="date_data">
            <div className="date_info">
                <p>Today's Date</p>
                <div className="date">{date}</div>
            </div>
            <div className="date_icon">
            <SlCalender />
            </div>
        </div>
    </div>
  )
}

export default Header