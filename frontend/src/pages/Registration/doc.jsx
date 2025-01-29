import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/Registration.css";
import axios from "axios";

const Registration = () => {
  //Post data
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");

  //handle submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patientData = {
      fname,
      lname,
      address,
      email,
      contact,
      dob,
      password,
      gender,
    };

    console.log(patientData);

    if (
      !fname ||
      !lname ||
      !address ||
      !email ||
      !contact ||
      !dob ||
      !password
    ) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8585/api/patients",
        patientData
      );
      console.log(response);
      setMessage("Registration Successful");
      setFname("");
      setLname("");
      setAddress("");
      setEmail("");
      setContact("");
      setDob("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setMessage("Error occured");
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
          <div className="message">{message}</div>
        <div className="reg_heading">
          <h2>Let's Get Started</h2>
          <p>Add Your Personal Details To Continue</p>
        </div>
        <div className="form_group">
          <div className="input_box">
            <div className="label">First Name</div>
            <input type="text" name="fname" value={fname} placeholder="First Name" onChange={(e) => setFname(e.target.value)} />
          </div>
          <div className="input_box">
            <div className="label">Last Name</div>
            <input type="text" name="lname" value={lname} placeholder="Last Name" onChange={(e) => setLname(e.target.value)} />
          </div>
        </div>
        <div className="form_group">
          <div className="input_box">
            <div className="label">Email</div>
            <input type="text" name="email" value={email} placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input_box">
            <div className="label">Mobile Number</div>
            <input type="number" name="contact" value={contact} placeholder="Contact" onChange={(e) => setContact(e.target.value)} />
          </div>
        </div>
        <div className="form_group">
          <div className="input_box">
            <div className="label">Address</div>
            <input type="text" name="address" value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="input_box">
            <div className="label">DOB</div>
            <input type="date" name="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
        </div>
        <div className="form_group">
          <div className="input_box">
            <div className="label">Enter Passwords</div>
            <input type={passwordType} name="password"  value={password} placeholder="Password " onChange={(e) => setPassword(e.target.value)} />
            <span className="eye" onClick={toogleVisibility}>
              {icon}
            </span>
          </div>
        </div>
        <div className="label">Select Gender</div>
        <div className="form_group">
          <div className="input_box sm">
            <label htmlFor="male" className="label">Male</label>
            <input className="radio" type="radio" id="male" name="gender" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} />
            </div>
          <div className="input_box sm">
          <label htmlFor="female" className="label">Female</label>
            <input className="radio female" type="radio" id="female" name="gender" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} />
          </div>
          <div className="input_box sm">
          <label htmlFor="other" className="label">Other</label>
            <input className="radio" type="radio" id="other" name="gender" value="Other" checked={gender === "Other"} onChange={(e) => setGender(e.target.value)} />
          </div>

        </div>

        <div className="form_group">
          <div className="input_box">
            <button type="submit"  onClick={handleSubmit}>  Submit </button>
          </div>
          <div className="input_box">
          <button type="reset" className="reg_btn"> Reset</button>

          </div>
        </div>
        <div className="login_page">
          <p>
            Already have an account <Link to="/login">Login</Link>
          </p>
        </div>
      
      </form>
     </div>
     
    </div>
  );
};

export default Registration;
