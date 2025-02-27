import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import './PatientsRecords.css';

const PatientsRecords = ({ onClose, patientId }) => {
  const [patientData, setPatientData] = useState([]);
  const [patientHistoryData, setPatientHistoryData] = useState([]);

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

    const fetchPatientHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8585/api/medicalRecords/patient/${patientId}`
        );
        setPatientHistoryData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    if (patientId) {
      fetchAllAppointments(); // Only fetch if patientId exists
      fetchPatientHistory();
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
              <th>Prescription</th>
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
                  <td>
                    {/* {patientHistoryData.length >= 0 ? (
                      
                      patientHistoryData.map((history) => (
                        <div key={history._id}>
                          {history.prescriptions.map((prescription, index) => (
                            <div key={prescription._id}>
                              
                              <p>Tablet Name: {prescription.tabletName}</p>
                              <p>Quantity: {prescription.quantity}</p>
                              <p>Dosage: {prescription.dosage}</p>
                              <p>Time: {prescription.time}</p>
                              
                            </div>
                          ))}
                        </div>
                      ))
                    ) : (
                      <p>No prescription data found.</p>
                    )} */}
                    {
                     patientHistoryData.map((history) => (
                          <div key={history._id}>
                            {history.prescriptions.map((prescription, index) => (
                              <div key={prescription._id}>
                                <p> {prescription.tabletName}</p>
                              </div>
                            ))}
                          </div>
                        ))
                     
                    }
                  </td>
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
