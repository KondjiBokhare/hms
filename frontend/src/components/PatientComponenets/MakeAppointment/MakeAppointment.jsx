import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import "./MakeAppointment.css";
import axios from "axios";

const MakeAppointment = ({ onClose, doctorName, doctorId }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  useEffect(() => {
    const patientId = localStorage.getItem("patientID");
    setPatientId(patientId);
    const patientData = JSON.parse(localStorage.getItem("user"));
    const name = patientData.fname + " " + patientData.lname;
    setPatientName(name);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doctorId || !patientId) {
      console.error("doctorId and patientId are required");
      setErrorMessage("Doctor ID and Patient ID are required.");
      setShowErrorPopup(true);
      return;
    }

    if (!date || !time || !reason) {
      console.log("All fields are required");
      setErrorMessage("Please fill in all the fields.");
      setShowErrorPopup(true);
      return;
    }

    const appointmentData = {
      patientId,
      doctorId,
      date,
      time,
      reason,
    };
    try {
      const response = await axios.post(
        "http://localhost:8585/api/appointments",
        appointmentData
      );
      alert("Appointment Successful!");
      onClose();
    } catch (error) {
      console.error("Error creating appointment", error);
    }
  };
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="make_appointment">
      <div className="close_popup">
        <IoCloseCircleOutline onClick={onClose} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input_field1">
          <label>Doctor Name</label>
          <input type="text" value={doctorName} readOnly />
        </div>
        <div className="input_field1">
          <label>Patient Name</label>
          <input type="text" value={patientName} readOnly />
        </div>
        <div className="input_field1">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={today}
            required
          />
        </div>
        <div className="input_field1">
          <label>Time:(make sure choose time between morning 9 to evening 9)</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            min="09:00"
            max="21:00"
            required
          />
          </div>
        <div className="input_field1">
          <label>Reason:</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
        {showErrorPopup && (
          <div className="error-popup">{errorMessage}</div>
        )}
        <div className="input_field1">
          <button type="submit">Make Appointment</button>
        </div>
      </form>
    </div>
  );
};

export default MakeAppointment;

