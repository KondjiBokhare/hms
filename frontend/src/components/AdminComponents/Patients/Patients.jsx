import React, { useState, useEffect } from 'react';
import './Patients.css';
import Header from '../../Header/Header';
import axios from 'axios';

const Patients = () => {
  const [patientList, setPatientList] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    contact: '',
    email: '',
    gender: '',
    dob: '',
    address: '',
  });

  useEffect(() => {
    const fetchAllPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8585/api/patients');
        const data = response.data;
        setPatientList(data);
        setFilteredPatients(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPatients();
  }, []);

  const deletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:8585/api/patients/${id}`);
      setPatientList(patientList.filter((patient) => patient._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const applyFilters = () => {
    let filteredData = patientList;

    // Apply filters based on user input
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filteredData = filteredData.filter((patient) => {
          if (key === 'name') {
            // Concatenate fname and lname for name filtering
            return `${patient.fname} ${patient.lname}`
              .toLowerCase()
              .includes(filters[key].toLowerCase());
          }
          return String(patient[key]).toLowerCase().includes(filters[key].toLowerCase());
        });
      }
    });

    setFilteredPatients(filteredData);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, patientList]);

  const resetFilters = () => {
    setFilters({
      name: '',
      contact: '',
      email: '',
      gender: '',
      dob: '',
      address: '',
    });
    setFilteredPatients(patientList); // Reset to show all patients
  };

  return (
    <div className="admin_patients">
      <div className="admin_header">
        <Header pagename="Patients" />
      </div>

      <div className="patients_filters">
        <div className="filter">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            placeholder="Filter by name"
          />
        </div>

        <div className="filter">
          <label htmlFor="contact">Contact:</label>
          <input
            type="text"
            name="contact"
            value={filters.contact}
            onChange={handleFilterChange}
            placeholder="Filter by contact"
          />
        </div>

        <div className="filter">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={filters.email}
            onChange={handleFilterChange}
            placeholder="Filter by email"
          />
        </div>

        <div className="filter">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            value={filters.address}
            onChange={handleFilterChange}
            placeholder="Filter by address"
          />
        </div>

        <button onClick={resetFilters} className="reset-filters-button">
          Reset Filters
        </button>
      </div>

      <div className="patients_data">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Handle Patient</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.fname} {patient.lname}</td>
                <td>{patient.contact}</td>
                <td>{patient.email}</td>
                <td>{patient.gender}</td>
                <td>{new Date(patient.dob).toLocaleDateString()}</td>
                <td>{patient.address}</td>
                <td>
                  <button type="submit" onClick={() => deletePatient(patient._id)}>
                    Remove Patient
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
