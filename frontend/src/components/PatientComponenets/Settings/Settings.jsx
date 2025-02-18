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
<<<<<<< HEAD
      </div>

      <div className="patientsetting_links">
        <div className="Account_settings">
          <div className="setting_icons"><FaBriefcaseMedical /></div>
          <div className="view_account_links">
            <h3>Account settings</h3>
            <div class="link">
              <a href="/ViewAccountDetails">Edit Your Name And Password</a>
 
</div>
            <p>Edit your Account Details & Change Password</p>
          </div>

        </div>
        <div className="viewaccount_details">
          <div className="setting_icons"> <IoEyeSharp /></div>
          <div className="view_account_links">
            <h3>View Account Details</h3>
            <div class="link">
              <a href="/ViewAccountDetails">View Account Details</a>
 
</div>

            <p>View Personal Information About Your Account</p>
          </div>

        </div>
        <div className="delete_account">
          <div className="setting_icons"> <FaWheelchairMove /></div>
          <div className="view_account_links">
            <h3>Delete Account</h3>
            <p>Will Permanently Remove your Account</p>
          </div>

        </div>
=======
      <UpdateUserProfile/>
      
>>>>>>> 03f4d9f45d09d0cea8e15a54246124b60f20c290
      </div>
    </div>
  )
}

export default Settings