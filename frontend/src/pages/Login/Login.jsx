import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8585/api/login", { email, password });
      console.log(response.data);
      if (response.status >= 200 && response.status < 300) {
        console.log("Login Successful");

        const { token, role, user } = response.data;
        console.log(token);
        console.log(user);
        console.log(role)

        window.localStorage.setItem("authToken", token);
        window.localStorage.setItem("role", role);
        window.localStorage.setItem("user", JSON.stringify(user));

        console.log(role);

        const isLoggedIn = true;
        window.localStorage.setItem("isLoggedIn", isLoggedIn);
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "patient") {
          navigate("/patient");
        } else if (role === "doctor") {
          navigate("/doctor");
        } else {
          console.log("Invalid Role");
        }
      } else {
        console.log("Login Failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="registration_session">
      <div className="form_content">
        <div className="left_image">
          <img src="https://i.postimg.cc/bJyPhbhB/two.jpg" alt="" />
        </div>
        <form onSubmit={handleLogin} className="registration_form">
          <div className="reg_heading">
            <h2>Welcome Back!</h2>
            <p>Login with your details to continue</p>
          </div>

          <div className="form_group">
            <div className="input_box">
              <div className="label">Email</div>
              <input
                type="text"
                value={email}
                placeholder="Email Address"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form_group">
            <div className="input_box">
              <div className="label">Password</div>
              <input
                type="password"
                value={password}
                placeholder="Password "
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="form_group">
            <div className="input_box">
              <button type="submit" className="reg_btn">
                Login
              </button>
            </div>
          </div>
          <div className="login_page">
          <p>
            Don't have an account <Link to={"/registration"}>Sign Up</Link>
          </p>
        </div>
        </form>
       
      </div>
      
    </div>
  );
};

export default Login;
