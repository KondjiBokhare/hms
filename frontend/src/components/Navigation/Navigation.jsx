import React from "react";
import './Navigation.css';
import { Link } from "react-router-dom";
import { BsArrowThroughHeartFill } from "react-icons/bs";


const Navigation = () => {
  return (
    <div className="navigation_section">
      <Link to="/" className="logo">
        <div className="hospital_name"><span><BsArrowThroughHeartFill /></span> Hospital Name</div>
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
