import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "../../Styles/Patient.css";
import { AiFillHome } from "react-icons/ai";
import { FaUserDoctor, FaCalendarDays } from "react-icons/fa6";
import { LuBookImage } from "react-icons/lu";
import { FiSettings } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

const Patient = () => {
  const [patientData, setPatientData] = useState(null);
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "patient") {
      const patient = JSON.parse(localStorage.getItem("user"));
      // console.log(patient)
      const patientname =patient.fname+""+patient.lname
      const patientID = patient?.id;
      window.localStorage.setItem("patientID", patientID);
      if (patient) {
        setPatientData(patient);
      }
    } else {
      console.log("This is not a patient role");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  if (!patientData) {
    return <div>Loading patient data...</div>;
  }

  return (
    <div className="patient_container">
      <div className="patient_sidebar">
        <div className="patient_profile">
          <div className="user_info">
            <div className="user_icon">
              <FaRegUser />
            </div>
            <div className="user">
              <div className="name">{patientData.fname} {patientData.lname}</div>
              <div className="email">{patientData.email}</div>
            </div>
          </div>
          <button className="logout_btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="line"></div>
        <div className="menu_list">
          <Link to="/patient">
            <AiFillHome /> Home
          </Link>
          <Link to="allDoctors">
            <FaUserDoctor /> All Doctors
          </Link>
          <Link to="myBookings">
            <LuBookImage /> My Bookings
          </Link>
          {/* <Link to="scheduledSessions">
            <FaCalendarDays /> Scheduled Sessions
          </Link> */}
          <Link to="settings">
            <FiSettings /> Settings
          </Link>
        </div>
      </div>
      <div className="patientContent">
        <Outlet />
      </div>
    </div>
  );
};

export default Patient;
