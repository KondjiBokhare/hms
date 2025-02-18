import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Registration.css";
import axios from "axios";

const Registration = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState(""); // State for error/success messages
  const navigate = useNavigate();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Password validation regex
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

  // Contact number validation
  const contactRegex = /^\d{10}$/;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!fname || !lname || !address || !email || !contact || !dob || !password || !gender) {
      setMessage("All fields are required.");
      return;
    }

    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email.");
      return;
    }

    if (!contactRegex.test(contact)) {
      setMessage("Please enter a valid contact number.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setMessage("Password must be at least 6 characters, including one uppercase letter and one number.");
      return;
    }

    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (age < 18 || (age === 18 && month < 0)) {
      setMessage("You must be at least 18 years old.");
      return;
    }

    try {
      const patientData = { fname, lname, address, email, contact, dob, password, gender, age };
      const response = await axios.post("http://localhost:8585/api/register", patientData);

      const { token, role, user } = response.data;
      window.localStorage.setItem("isLoggedIn", true);
      window.localStorage.setItem("authToken", token);
      window.localStorage.setItem("role", role);
      window.localStorage.setItem("user", JSON.stringify(user));

      if (response.status === 200 && role === "patient") {
        navigate("/patient");
      }
    } catch (error) {
      setMessage(error.response ? error.response.data : "An error occurred.");
    }
  };


  //password visibility
  const [passwordType, setPasswordType] = useState("password");
  const [icon, setIcon] = useState("👁️");

  const toogleVisibility = () => {
    if (passwordType == "password") {
      setIcon("🙈");
      setPasswordType("text");
    } else {
      setIcon("👁️");
      setPasswordType("password");
    }
  };


  return (
    <div className="registration_session">
      <div className="form_content">
        <div className="left_image">
          <img src="https://i.postimg.cc/bJyPhbhB/two.jpg" alt="" />
        </div>
        <form action="" method="post" className="registration_form">
          <div className="reg_heading">
            <h2>Let's Get Started</h2>
            <p>Add Your Personal Details To Continue</p>
          </div>
          <div className="form_group">
            <div className="input_box">
              <div className="label">First Name</div>
              <input
                type="text"
                name="fname"
                value={fname}
                placeholder="First Name"
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="input_box">
              <div className="label">Last Name</div>
              <input
                type="text"
                name="lname"
                value={lname}
                placeholder="Last Name"
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
          </div>
          <div className="form_group">
            <div className="input_box">
              <div className="label">Email</div>
              <input
                type="text"
                name="email"
                value={email}
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input_box">
              <div className="label">Mobile Number</div>
              <input
                type="number"
                name="contact"
                value={contact}
                placeholder="Contact"
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>
          <div className="form_group">
            <div className="input_box">
              <div className="label">Address</div>
              <input
                type="text"
                name="address"
                value={address}
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="input_box">
              <div className="label">DOB</div>
              <input
                type="date"
                name="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
          </div>
          <div className="form_group">
            <div className="input_box">
              <div className="label">Enter Password</div>
              {/* <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              /> */}
              <div className="passfield">
                <input type={passwordType} name="password" value={password} placeholder="Password " id="passfield" onChange={(e) => setPassword(e.target.value)} />
                <span className="eye" onClick={toogleVisibility}>
                  {icon}
                </span>
              </div>
            </div>
            <div className="input_box">
              <div className="label">Select Gender</div>
              <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          {message && <div className="error_message">{message}</div>}
          <div className="form_group">
            <div className="input_box">
              <button type="submit" className="reg_btn" onClick={handleSubmit}>
                Signup
              </button>
            </div>
            <div className="input_box">
              <button type="reset" className="reg_btn">
                Reset Form
              </button>
            </div>
          </div>
          <div className="login_page">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
