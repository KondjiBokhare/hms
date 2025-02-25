import React, { useState, useEffect } from 'react';
import './DoctorPrescription.css';
import axios from 'axios';
import { IoCloseCircleOutline } from "react-icons/io5";

const DoctorPrescription = ({ onClose, patientId }) => {
  // Define state for medical record
  const [patientData, setPatientData] = useState('');
  const [prescription, setPrescription] = useState([{
    tabletName: '',
    dosage: '',
    time: '',
    quantity: ''
  }]);

  const user = JSON.parse(localStorage.getItem('user'));
  const DoctorName = user.name;
  const DoctorId = user.id;

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8585/api/patients/${patientId}`
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

  const patientName = patientData.fname + " " + patientData.lname;

  // Define suggested values for dosage and time
  const dosageSuggestions = ['1-0-1', '0-0-1', '1-1-1', '1-0-0'];
  const timeSuggestions = ['After breakfast', 'Before meals', 'Before bed', 'After lunch', 'Once daily'];

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const medicalRecord = {
      patient: patientId,
      doctor: DoctorId,
      prescription: prescription
    };

    try {
      const response = await axios.post('http://localhost:8585/api/medicalRecords', medicalRecord, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST"
      });
    
      if (response.status === 201) {
        alert("Medical record added successfully!");
      }
      setPrescription([{
        tabletName: '',
        dosage: '',
        time: '',
        quantity: ''
      }]);
    } catch (error) {
      // Log more detailed information
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      alert("There was an error saving the medical record.");
    }
    
  };

  // Handle changes in individual prescription fields
  const handlePrescriptionChange = (index, field, value) => {
    const newPrescription = [...prescription];
    newPrescription[index][field] = value;
    setPrescription(newPrescription);
  };

  // Function to add more prescription fields
  const handleAddPrescription = () => {
    setPrescription([
      ...prescription,
      { tabletName: '', dosage: '', time: '', quantity: '' }
    ]);
  };

  return (
    <div className="prescription_form">
      <div className="close-popup">
        <IoCloseCircleOutline onClick={onClose} />
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Doctor's Prescription</h2>
        <div className="form-group">
          <label>Patient Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter patient name"
            value={patientName}
            required
          />
        </div>
        <div className="form-group">
          <label>Doctor Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter doctor name"
            value={DoctorName}
            required
          />
        </div>
        <div className="form-group">
          <label>Prescription</label>
          {prescription.map((pres, index) => (
            <div key={index} className="prescription-input">
              <input
                type="text"
                className="form-control"
                placeholder="Tablet Name"
                value={pres.tabletName}
                onChange={(e) => handlePrescriptionChange(index, 'tabletName', e.target.value)}
                required
              />
              <select
                className="form-control"
                value={pres.dosage}
                onChange={(e) => handlePrescriptionChange(index, 'dosage', e.target.value)}
                required
              >
                <option value="">Select Dosage</option>
                {dosageSuggestions.map((dosage, index) => (
                  <option key={index} value={dosage}>
                    {dosage}
                  </option>
                ))}
              </select>
              <select
                className="form-control"
                value={pres.time}
                onChange={(e) => handlePrescriptionChange(index, 'time', e.target.value)}
                required
              >
                <option value="">Select Time</option>
                {timeSuggestions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={pres.quantity}
                onChange={(e) => handlePrescriptionChange(index, 'quantity', e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddPrescription} className="btn btn-secondary">Add Prescription</button>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default DoctorPrescription;
