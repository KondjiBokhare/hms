import React, { useState, useEffect } from 'react';
import './DoctorPrescription.css';
import axios from 'axios';
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
const DoctorPrescription = ({ onClose, patientId }) => {
  const [patientData, setPatientData] = useState({});
  const [prescriptions, setPrescriptions] = useState([
    { tabletName: '', dosage: '', time: '', quantity: '' }
  ]);

  const user = JSON.parse(localStorage.getItem('user')) || {};
  const DoctorName = user.name || 'Unknown Doctor';
  const DoctorId = user.id || '';

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://localhost:8585/api/patients/${patientId}`);
        setPatientData(response.data);
      } catch (error) {
        toast.error("Error fetching patient data:");
      }
    };

    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  const patientName = `${patientData.fname || ''} ${patientData.lname || ''}`.trim();

  const dosageSuggestions = ['1-0-1', '0-0-1', '1-1-1', '1-0-0'];
  const timeSuggestions = ['After breakfast', 'Before meals', 'Before bed', 'After lunch', 'Once daily'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const medicalRecord = {
      patient: patientId,
      doctor: DoctorId,
      prescriptions, // Ratalya prescription Nahi `prescriptions` Hot Te
    };

    try {
      const response = await axios.post('http://localhost:8585/api/medicalRecords', medicalRecord, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 201) {
        toast.success("Medical record added successfully!")
        alert("Medical record added successfully!")

        setPrescriptions([{ tabletName: '', dosage: '', time: '', quantity: '' }]);
      }
    } catch (error) {
      toast.error("Something Went Wrong")
  }
  };

  const handlePrescriptionChange = (index, field, value) => {
    setPrescriptions(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleAddPrescription = () => {
    setPrescriptions([...prescriptions, { tabletName: '', dosage: '', time: '', quantity: '' }]);
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
          <input type="text" className="form-control" value={patientName} readOnly />
        </div>

        <div className="form-group">
          <label>Doctor Name</label>
          <input type="text" className="form-control" value={DoctorName} readOnly />
        </div>

        <div className="form-group">
          <label>Prescription</label>
          {prescriptions.map((pres, index) => (
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
                {dosageSuggestions.map((dosage, i) => (
                  <option key={i} value={dosage}>{dosage}</option>
                ))}
              </select>
              <select
                className="form-control"
                value={pres.time}
                onChange={(e) => handlePrescriptionChange(index, 'time', e.target.value)}
                required
              >
                <option value="">Select Time</option>
                {timeSuggestions.map((time, i) => (
                  <option key={i} value={time}>{time}</option>
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
          <button type="button" onClick={handleAddPrescription} className="btn btn-secondary">
            Add Prescription
          </button>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default DoctorPrescription;
