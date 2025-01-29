import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import '../../Styles/Admin.css'
import {AiFillHome} from 'react-icons/ai'
import {FaUserDoctor,FaCalendarDays,} from 'react-icons/fa6'
import {LuBookImage} from 'react-icons/lu'
import {FiSettings} from 'react-icons/fi'
import {FaNotesMedical,FaRegUser} from 'react-icons/fa'

const Admin = () => {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      const admin = JSON.parse(localStorage.getItem("user"));
      const adminID = admin?.id;
      window.localStorage.setItem("adminID", adminID);
      if (admin) {
        setAdminData(admin);
      }
    } else {
      console.log("This is not a admin role");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  if (!adminData) {
    return <div>Loading admin data...</div>;
  }

  return (
    <div className="admin_container">
      <div className="admin_sidebar">
        <div className="admin_profile">
          <div className="user_info">
          <div className="user_icon"><FaRegUser/></div>
          <div className="user">
            <div className="name">{adminData.name}</div>
            <div className="email">{adminData.email}</div>
          </div>
          </div>
          <button className="logout_btn" onClick={handleLogout}>Logout</button>
        </div>
        <div className="line"></div>
        <div className="menu_list">
            <Link to="/admin"><AiFillHome/> Dashboard</Link>
            <Link to="doctors"><FaUserDoctor/> Doctors</Link>
            <Link to="appointments"><LuBookImage/> Appointments</Link>
            <Link to="patients"><FaCalendarDays/> Patients</Link>
            {/* <Link to="settings"><FiSettings/> Settings</Link> */}
            {/* <Link to="schedule"><FaNotesMedical /> Schedule</Link> */}
        </div>
        
      </div>
      <div className="adminContent">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
