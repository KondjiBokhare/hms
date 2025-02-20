import React from "react";
import './Navigation.css';
import { Link } from "react-router-dom";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { FaHospitalSymbol } from "react-icons/fa";
>>>>>>> 03f4d9f (A)
=======
import { FaHospitalSymbol } from "react-icons/fa";
>>>>>>> bec3171262bd53ddc4d2863cfc6250a706401649

const Navigation = () => {
  return (
    <div className="navigation_section">
      <Link to="/" className="logo">
<<<<<<< HEAD
<<<<<<< HEAD
        HMS
=======
      <div className="icon"><FaHospitalSymbol /></div>
        <div className="hospital_name">MIT Hospital</div>
>>>>>>> 03f4d9f (A)
=======
      <div className="icon"><FaHospitalSymbol /></div>
        <div className="hospital_name">MIT Hospital</div>
>>>>>>> bec3171262bd53ddc4d2863cfc6250a706401649
      </Link>
      <div className="nav_links">
        <Link to="/registration" className="reg">
          Register
        </Link>{" "}
        <Link to="/login" className="reg">
          SignIn
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
