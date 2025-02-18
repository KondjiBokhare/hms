<<<<<<< HEAD

import React, { useEffect, useState } from 'react';

const UpdateUserProfile = () => {
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState('');

  useEffect(() => {
    // Simulating fetching data from the server (Replace with your backend API call)
    const fetchedUserData = {
      username: 'john_doe',
      email: 'john.doe@example.com'
    };
    setUserData(fetchedUserData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessages('');  // Clear previous errors

    // Simple validation
    if (!currentPassword || !newPassword) {
      setErrorMessages('Please fill out all fields.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessages('New password must be at least 6 characters.');
      return;
    }

    // Send data to the backend (Replace with your real backend API)
    // Example: Update user information via API call
    fetch('/updateUserProfile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Profile updated successfully!');
      } else {
        setErrorMessages(data.message || 'An error occurred.');
      }
    })
    .catch(error => {
      setErrorMessages('Error: ' + error.message);
    });
  };

  return (
    <div className="container">
      <h1>User Profile</h1>
      <form id="userProfileForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={userData.username} disabled />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={userData.email} disabled />
        </div>
        <div>
          <label htmlFor="currentPassword">Current Password:</label>
          <input type="password" id="currentPassword" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input type="password" id="newPassword" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <button type="submit">Update Information</button>
      </form>
      <div id="errorMessages" className="error">{errorMessages}</div>
=======
import React, { useState, useEffect } from "react";
import "./UpdateUserProfile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For password visibility toggle

const UpdateUserProfile = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");  // Date of birth to be editable
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");  // For password confirmation
  const [currentPassword, setCurrentPassword] = useState("");  // For current password check
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState(""); // State for error/success messages
  const [loading, setLoading] = useState(true); // Loading state
  const [passwordVisible, setPasswordVisible] = useState(false); // To toggle current password visibility
  const [newPasswordVisible, setNewPasswordVisible] = useState(false); // To toggle new password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // To toggle confirm password visibility
  const navigate = useNavigate();
  const patientId = window.localStorage.getItem("patientID");

  // Convert DOB to dd-mm-yyyy format
  const formatDate = (date) => {
    const newDate = new Date(date);
    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const year = newDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Fetch user data to pre-fill the form fields
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8585/api/patients/${patientId}`); // Fetch user data
        const { fname, lname, address, email, contact, dob, gender } = response.data;
        setFname(fname);
        setLname(lname);
        setEmail(email);
        setContact(contact);
        setAddress(address);
        setDob(formatDate(dob));  // Format date
        setGender(gender);
      } catch (error) {
        setMessage("Error fetching user data");
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchUserData();
  }, [patientId]);

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

    // If password is changing, check if the current password is entered and matches with the stored password
    if (currentPassword && currentPassword !== password) {
      setMessage("Current password does not match the entered password.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const today = new Date();
    const birthDate = new Date(dob.split("-").reverse().join("-")); // Convert dd-mm-yyyy format to date object
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (age < 18 || (age === 18 && month < 0)) {
      setMessage("You must be at least 18 years old.");
      return;
    }

    try {
      const patientData = { fname, lname, address, email, contact, dob, password, gender };
      const response = await axios.put("http://localhost:8585/api/updateProfile", patientData);

      if (response.status === 200) {
        setMessage("Profile updated successfully!");
        setTimeout(() => {
          navigate("/patient"); // Navigate after a successful update
        }, 2000);
      }
    } catch (error) {
      setMessage(error.response ? error.response.data : "An error occurred.");
    }
  };
  console.log(dob);

  return (
    <div className="update_profile_container">
      <div className="form_content">
        {loading ? (
          <div className="loader">Loading...</div> // Loading spinner or message
        ) : (
          <form onSubmit={handleSubmit} className="update_profile_form">
            <div className="form_header">
              <h2>Update Your Profile</h2>
              <p>Update your personal details below</p>
            </div>

            {/* Input fields */}
            <div className="form_group">
              <input
                type="text"
                placeholder="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                className="input_field"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className="input_field"
              />
            </div>

            <div className="form_group">
              <input
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input_field"
              />
              <input
                type="tel"
                placeholder="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="input_field"
              />
            </div>

            <div className="form_group">
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="input_field"
              />
              <input
                type="date"
                value={dob}  // Make DOB field editable and show date
                onChange={(e) => setDob(e.target.value)}
                className="input_field"
              />
            </div>

            <div className="form_group">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input_field"
              />
              <div className="password-visibility-toggle" onClick={() => setPasswordVisible(!passwordVisible)} >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
              
              <input
                type={newPasswordVisible ? "text" : "password"}
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input_field"
              />
              <div className="password-visibility-toggle" onClick={() => setNewPasswordVisible(!newPasswordVisible)}>
                {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>

              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input_field"
              />
              <div className="password-visibility-toggle" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input_field"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Error Message */}
            {message && <div className="error_message">{message}</div>}

            <div className="form_actions">
              <button type="submit" className="update_btn">Update Profile</button>
            </div>
          </form>
        )}
      </div>
>>>>>>> 03f4d9f45d09d0cea8e15a54246124b60f20c290
    </div>
  );
};

<<<<<<< HEAD
export default UpdateUserProfile;
=======
export default UpdateUserProfile;
>>>>>>> 03f4d9f45d09d0cea8e15a54246124b60f20c290
