import React from "react";
import './Navigation.css';
import { Link } from "react-router-dom";
<<<<<<< HEAD
=======
import { FaHospitalSymbol } from "react-icons/fa";
>>>>>>> 03f4d9f (A)

const Navigation = () => {
  return (
    <div className="navigation_section">
      <Link to="/" className="logo">
<<<<<<< HEAD
        HMS
=======
      <div className="icon"><FaHospitalSymbol /></div>
        <div className="hospital_name">MIT Hospital</div>
>>>>>>> 03f4d9f (A)
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
