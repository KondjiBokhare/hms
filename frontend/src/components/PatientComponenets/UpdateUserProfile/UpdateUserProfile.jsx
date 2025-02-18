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
              {/* <input
                type="date"
                value={dob}  // Make DOB field editable and show date
                onChange={(e) => setDob(e.target.value)}
                className="input_field"
              /> */}
              <input
            type="text"
            value={dob}
            onChange={(e) => setDob(e.target.value)}  // User can edit date in dd-mm-yyyy format
            onBlur={(e) => setDob(formatDateToDDMMYYYY(e.target.value))}  // Format when losing focus
            className="input_field"
            placeholder="DD-MM-YYYY"
          />
            </div>

            <div className="form_group">

              <div className="pass_field">
                <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input_field"
              />
                <div className="password-visibility-toggle eye" onClick={() => setPasswordVisible(!passwordVisible)} >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </div></div>
              <div className="pass_field"> <input
                type={newPasswordVisible ? "text" : "password"}
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input_field"
              />
                <div className="password-visibility-toggle eye" onClick={() => setNewPasswordVisible(!newPasswordVisible)}>
                  {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="pass_field">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input_field"
                />
                <div className="password-visibility-toggle eye" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
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
    </div>
  );
};

export default UpdateUserProfile;
