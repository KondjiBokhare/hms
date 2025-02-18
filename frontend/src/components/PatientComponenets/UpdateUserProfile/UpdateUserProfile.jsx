
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
    </div>
  );
};

export default UpdateUserProfile;