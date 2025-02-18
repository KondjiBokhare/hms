import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import './PatientsRecords.css';

// Example of symptoms and precautions data (you could fetch this from your backend or hardcode it)
const symptomPrecautionsData = {
  "acne": {
    symptoms: ["skin_rash", "pus_filled_pimples", "blackheads", "scurring"],
    precautions: [
      "bath twice",
      "avoid fatty spicy food",
      "drink plenty of water",
      "avoid too many products"
    ]
  },
  // Add more conditions here as needed...
  // Example:
  "flu": {
    symptoms: ["fever", "chills", "headache", "fatigue"],
    precautions: [
      "rest",
      "drink fluids",
      "take fever medicine",
      "avoid close contact with others"
    ]
  }
};

const PatientsRecords = ({ onClose, patientId }) => {
  const [patientData, setPatientData] = useState([]);

  // Fetch all appointments
  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8585/api/appointmentbypatient/${patientId}`
        );
        setPatientData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (patientId) {
      fetchAllAppointments(); // Only fetch if patientId exists
    }
  }, [patientId]);

  // Function to get precautions based on the reason
  const getPrecautions = (reason) => {
    // Normalize case and trim any extra spaces
    const normalizedReason = reason.toLowerCase().trim();
    const match = symptomPrecautionsData[normalizedReason];

    if (match) {
      return match.precautions.join(", ");
    } else {
      return "No precautions available";
    }
  };

  return (
    <div className="patients-record-popup">
      <div className="close-popup">
        <IoCloseCircleOutline onClick={onClose} />
      </div>
      <div className="patient-info">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Appointment Date</th>
              <th>Appointment Reason</th>
              <th>Precision</th>
            </tr>
          </thead>
          <tbody>
            {patientData.length === 0 ? (
              <tr>
                <td colSpan="3" className="no-appointments">
                  No appointments found for this patient.
                </td>
              </tr>
            ) : (
              patientData.map((data) => (
                <tr key={data._id}>
                  <td>{new Date(data.date).toLocaleDateString()}</td>
                  <td>{data.reason}</td>
                  <td>{getPrecautions(data.reason)}</td> {/* Fetch and display precautions */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsRecords;
