import React from 'react'
import './Settings.css'
import Header from '../../Header/Header'
import { FaBriefcaseMedical } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { FaWheelchairMove } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import UpdateUserProfile from '../UpdateUserProfile/UpdateUserProfile';

const Settings = () => {
  return (
    <div className="patient_session">
      <div className="patient_header">
        <Header pagename="Settings" />
      <UpdateUserProfile/>
      
      </div>
    </div>
  )
}

export default Settings