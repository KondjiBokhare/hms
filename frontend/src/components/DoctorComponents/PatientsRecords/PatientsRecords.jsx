import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import './PatientsRecords.css';

const PatientsRecords = ({ onClose, patientId }) => {
  const [patientData, setPatientData] = useState([]);

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
              {/* <th>Appointment Time</th>
              <th>Appointment Status</th> */}
            </tr>
          </thead>
          <tbody>
            {patientData.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-appointments">
                  No appointments found for this patient.
                </td>
              </tr>
            ) : (
              patientData.map((data) => (
                <tr key={data._id}>
                  <td>{new Date(data.date).toLocaleDateString()}</td>
                  <td>{data.reason}</td>
                  {/* <td>{data.time}</td> */}
                  {/* <td>{data.status}</td> */}
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
