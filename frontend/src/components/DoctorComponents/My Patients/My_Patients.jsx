import React, { useState, useEffect } from 'react';
import './My_Patients.css';
import Header from '../../Header/Header';
import axios from 'axios';

const My_Patients = () => {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  const [filterAge, setFilterAge] = useState('');

  useEffect(() => {
    const fetchAllAppointments = async () => {
      const doctorId = window.localStorage.getItem('doctorID');

      if (!doctorId) {
        console.error('Doctor ID not found in localStorage.');
      } else if (!doctorId || !/^[0-9a-fA-F]{24}$/.test(doctorId)) {
        console.log(doctorId);
        console.log('Invalid doctor ID format');
        return;
      } else {
        try {
          const response = await axios.get(
            `http://localhost:8585/api/appointmentbydoctor/${doctorId}`
          );
          const data = response.data;
          setAppointmentsList(data);
          setFilteredAppointments(data); // Initialize filteredAppointments with all data
        } catch (error) {
          console.log('Error message:', error.message);
          console.log('Error response:', error.response?.data);
        }
      }
    };
    fetchAllAppointments();
  }, []);

  const uniqueAppointments = appointmentsList.filter(
    (appointment, index, self) =>
      index ===
      self.findIndex(
        (a) =>
          a.patientId?.email === appointment.patientId?.email ||
          a.patientId?.contact === appointment.patientId?.contact
      )
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setFilterName(value);
    } else if (name === 'email') {
      setFilterEmail(value);
    } else if (name === 'age') {
      setFilterAge(value);
    }
  };

  const applyFilters = () => {
    let filteredData = uniqueAppointments;

    if (filterName) {
      filteredData = filteredData.filter(
        (appointment) =>
          appointment.patientId?.fname
            .toLowerCase()
            .includes(filterName.toLowerCase()) ||
          appointment.patientId?.lname
            .toLowerCase()
            .includes(filterName.toLowerCase())
      );
    }

    if (filterEmail) {
      filteredData = filteredData.filter((appointment) =>
        appointment.patientId?.email.toLowerCase().includes(filterEmail.toLowerCase())
      );
    }

    if (filterAge) {
      filteredData = filteredData.filter(
        (appointment) => appointment.patientId?.age.toString() === filterAge
      );
    }

    setFilteredAppointments(filteredData);
  };

  const resetFilters = () => {
    setFilterName('');
    setFilterEmail('');
    setFilterAge('');
    setFilteredAppointments(uniqueAppointments); // Reset to show all patients
  };

  useEffect(() => {
    applyFilters(); // Apply the filters whenever they change
  }, [filterName, filterEmail, filterAge]);

  return (
    <div className="doctor_appointments">
      <div className="doctor_header">
        <Header pagename="MY_Patients" />
      </div>
      <div className="appointments_data">
        {/* Filters */}
        <div className="filters">
          <div className="pname_filter">
            <label htmlFor="name">Filter by Name:</label>
            <input
              type="text"
              name="name"
              value={filterName}
              onChange={handleFilterChange}
              placeholder="Filter by Patient Name"
            />
          </div>
          <div className="email_filter">
            <label htmlFor="email">Filter by Email:</label>
            <input
              type="email"
              name="email"
              value={filterEmail}
              onChange={handleFilterChange}
              placeholder="Filter by Email"
            />
          </div>
          <div className="age_filter">
            <label htmlFor="age">Filter by Age:</label>
            <input
              type="number"
              name="age"
              value={filterAge}
              onChange={handleFilterChange}
              placeholder="Filter by Age"
            />
          </div>
          <button className="remove-filters" onClick={resetFilters}>
          Remove Filters
        </button>

        </div>

        {/* Remove Filters Button */}
       
        {/* Appointments Table */}
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>
                  {appointment.patientId?.fname} {appointment.patientId?.lname}
                </td>
                <td>{appointment.patientId?.contact}</td>
                <td>{appointment.patientId?.email}</td>
                <td>{appointment.patientId?.age}</td>
                <td>{appointment.patientId?.gender}</td>
                <td>{appointment.patientId?.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default My_Patients;
