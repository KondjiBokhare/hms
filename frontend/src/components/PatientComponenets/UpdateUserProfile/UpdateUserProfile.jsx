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
  const [dob, setDob] = useState(""); // Date of birth to be editable
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState(""); // State for error/success messages
  const [loading, setLoading] = useState(true); // Loading state 
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordTypeCurrent, setPasswordTypeCurrent] = useState("password");
  const [passwordTypeNew, setPasswordTypeNew] = useState("password");
  const [passwordTypeConfirm, setPasswordTypeConfirm] = useState("password");
  const [iconCurrent, setIconCurrent] = useState(<FaEyeSlash />);
  const [iconNew, setIconNew] = useState(<FaEyeSlash />);
  const [iconConfirm, setIconConfirm] = useState(<FaEyeSlash />);
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      const authToken = window.localStorage.getItem("authToken");
      if (!authToken) {
        alert("You are not logged in!");
        return;
      }

      const response = await axios.post(
        "http://localhost:8585/api/changePassword",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (response.status === 200) {
        alert("Password changed successfully!");
        navigate("/login"); // Redirect to login page after password change
      } else {
        alert("Failed to change password!");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again.");
    } finally {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

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
        const response = await axios.get(
          `http://localhost:8585/api/patients/${patientId}`
        ); // Fetch user data
        const { fname, lname, address, email, contact, dob, gender } = response.data;
        setFname(fname);
        setLname(lname);
        setEmail(email);
        setContact(contact);
        setAddress(address);
        setDob(formatDate(dob)); // Format date
        setGender(gender);
      } catch (error) {
        setMessage("Error fetching user data");
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchUserData();
  }, [patientId]);

  // Password visibility toggle function
  const toggleVisibilityCurrent = () => {
    setPasswordTypeCurrent(passwordTypeCurrent === "password" ? "text" : "password");
    setIconCurrent(passwordTypeCurrent === "password" ? <FaEye /> : <FaEyeSlash />);
  };

  const toggleVisibilityNew = () => {
    setPasswordTypeNew(passwordTypeNew === "password" ? "text" : "password");
    setIconNew(passwordTypeNew === "password" ? <FaEye /> : <FaEyeSlash />);
  };

  const toggleVisibilityConfirm = () => {
    setPasswordTypeConfirm(passwordTypeConfirm === "password" ? "text" : "password");
    setIconConfirm(passwordTypeConfirm === "password" ? <FaEye /> : <FaEyeSlash />);
  };

  return (
    <div className="update_profile_container">
      <div className="form_content">
        {loading ? (
          <div className="loader">Loading...</div> // Loading spinner or message
        ) : (
          <form onSubmit={handleChangePassword} className="update_profile_form">
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
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="input_field"
                placeholder="DD-MM-YYYY"
              />
            </div>

            {/* Password fields */}
            <div className="password_field_group">
              <div className="password_field">
                <input
                  type={passwordTypeCurrent}
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input_field"
                />
                <span className="eye_icon" onClick={toggleVisibilityCurrent}>
                  {iconCurrent}
                </span>
              </div>

              <div className="password_field">
                <input
                  type={passwordTypeNew}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input_field"
                />
                <span className="eye_icon" onClick={toggleVisibilityNew}>
                  {iconNew}
                </span>
              </div>

              <div className="password_field">
                <input
                  type={passwordTypeConfirm}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input_field"
                />
                <span className="eye_icon" onClick={toggleVisibilityConfirm}>
                  {iconConfirm}
                </span>
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

            {/* Gender selection */}
            

            {/* Error Message */}
            {message && <div className="error_message">{message}</div>}

            <div className="form_actions">
              <button type="submit" className="update_btn">
                Update Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateUserProfile;

  



//   return (
//     <div className="registration_session">
//       <div className="form_content">
//         <div className="left_image">
//           <img src="https://i.postimg.cc/bJyPhbhB/two.jpg" alt="" />
//         </div>
//         <form onSubmit={handleChangePassword} className="registration_form">
//           <div className="reg_heading">
//             <h2>Change Password</h2>
//             <p>Enter your current password and a new one to update.</p>
//           </div>

          
//           <div className="form_group">
//             <div className="input_box">
//               <button type="submit" className="reg_btn">
//                 Change Password
//               </button>
//             </div>
//           </div>

//           <div className="login_page">
//             <p>
//               Remember your password? <a href="/login">Login</a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateUserProfile;

