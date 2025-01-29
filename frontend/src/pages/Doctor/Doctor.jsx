import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import '../../Styles/Doctor.css'
import {AiFillHome} from 'react-icons/ai'
import {FaUserDoctor,FaCalendarDays,} from 'react-icons/fa6'
import {LuBookImage} from 'react-icons/lu'
import {FiSettings} from 'react-icons/fi'
import {FaNotesMedical,FaRegUser} from 'react-icons/fa'

const Doctor = () => {
  const [doctorData, setDoctorData] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "doctor") {
      const doctor = JSON.parse(localStorage.getItem("user"));
      const doctorID = doctor?.id;
      console.log(doctorID)
      window.localStorage.setItem("doctorID", doctorID);
      if (doctor) {
        setDoctorData(doctor);
      }
    } else {
      console.log("This is not a doctor role");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  if (!doctorData) {
    return <div>Loading doctor data...</div>;
  }

  return (
    <div className="doctor_container">
      <div className="doctor_sidebar">
        <div className="doctor_profile">
          <div className="user_info">
          <div className="user_icon"><FaRegUser/></div>
          <div className="user">
            <div className="name">{doctorData.name}</div>
            <div className="email">{doctorData.email}</div>
          </div>
          </div>
          <button className="logout_btn" onClick={handleLogout}>Logout</button>
        </div>
        <div className="line"></div>
        <div className="menu_list">
            <Link to="/doctor"><AiFillHome/> Dashboard</Link>
            <Link to="myAppointments"><FaUserDoctor/> My Appointments</Link>
            <Link to="myPatients"><LuBookImage/> My Patients</Link>
            {/* <Link to="mySessions"><FaCalendarDays/> My Sessions</Link> */}
        </div>
      </div>
      <div className="doctorContent">
        <Outlet />
      </div>
    </div>
  );
};

export default Doctor;
