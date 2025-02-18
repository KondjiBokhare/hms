import React, { useRef, useState } from "react";
import axios from "axios";
import { IoCloseCircleOutline } from "react-icons/io5";
import './AddDoctor.css'

const AddDoctor = ({ onClose, onAddDoctor }) => {
  const popRef = useRef();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [password, setPassword] = useState("");

  const closePopup = (e) => {
    if (popRef.current === e.target) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic for phone, email, and password
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(contact)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordPattern.test(password)) {
      alert("Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character.");
      return;
    }

    const doctorData = {
      name,
      contact,
      email,
      specialization,
      experience,
      password,
    };

    try {
      const response = await axios.post("http://localhost:8585/api/doctor", doctorData);
      if (response.status === 201) {
        alert("Doctor Added Successfully");

        // Call the onAddDoctor function to update the parent component's state
        onAddDoctor(doctorData);

        // Close the popup
        onClose();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add doctor, please try again.");
    }

    // Reset form
    setName("");
    setContact("");
    setEmail("");
    setExperience("");
    setSpecialization("");
    setPassword("");
  };

  return (
    <div className="add_doctor" ref={popRef} onClick={closePopup}>
      <div className="close_popup">
        <IoCloseCircleOutline onClick={onClose} />
      </div>
      <form action="" method="post" onSubmit={handleSubmit} className="doctor_form">
        <div className="input_field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            id="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input_field">
          <label htmlFor="contact">Contact</label>
          <input
            type="number"
            value={contact}
            name="contact"
            id="contact"
            placeholder="Contact"
            minLength={10}
            maxLength={10}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="input_field">
          <label htmlFor="specialization">Specialization</label>
          <select
            name="specialization"
            value={specialization}
            id="specialization"
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="">Select Specialization</option>
            <option value="General">General</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Orthopedist">Orthopedist</option>
            <option value="Cosmetologist">Cosmetologist</option>
          </select>
        </div>
        <div className="input_field">
          <label htmlFor="experience">Experience</label>
          <input
            type="number"
            value={experience}
            id="experience"
            name="experience"
            placeholder="Enter Experience"
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <div className="input_field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input_field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input_field">
          <button type="submit">ADD DOCTOR</button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
