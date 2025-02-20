import React from 'react'
import './Settings.css'
import Header from '../../Header/Header'
import UpdateUserProfile from '../UpdateUserProfile/UpdateUserProfile';

const Settings = () => {
  return (
    <div className="patient_session">
      <div className="patient_header">
        <Header pagename="Settings" />

      
      </div>

      <UpdateUserProfile/>
    </div>
  )
}

export default Settings