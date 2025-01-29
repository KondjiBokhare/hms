import React from "react";
import './Navigation.css';
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation_section">
      <Link to="/" className="logo">
        HMS
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
