import React, { useState, useEffect } from "react";
import "./Appointment.css";
import axios from "axios";
import Header from "../../Header/Header";

const Appointment = () => {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [patientNameFilter, setPatientNameFilter] = useState("");
  const [doctorNameFilter, setDoctorNameFilter] = useState("");

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8585/api/appointments"
        );
        const data = response.data;
        setAppointmentsList(data);
        setFilteredAppointments(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllAppointments();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filteredData = appointmentsList;

      if (dateFilter) {
        filteredData = filteredData.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          const filterDate = new Date(dateFilter);

          // Normalize both dates to the same format (YYYY-MM-DD) for accurate comparison
          return (
            appointmentDate.getFullYear() === filterDate.getFullYear() &&
            appointmentDate.getMonth() === filterDate.getMonth() &&
            appointmentDate.getDate() === filterDate.getDate()
          );
        });
      }

      if (patientNameFilter) {
        filteredData = filteredData.filter((appointment) =>
          `${appointment.patientId?.fname} ${appointment.patientId?.lname}`
            .toLowerCase()
            .includes(patientNameFilter.toLowerCase())
        );
      }

      if (doctorNameFilter) {
        filteredData = filteredData.filter((appointment) =>
          appointment.doctorId?.name
            .toLowerCase()
            .includes(doctorNameFilter.toLowerCase())
        );
      }

      setFilteredAppointments(filteredData);
    };

    applyFilters();
  }, [dateFilter, patientNameFilter, doctorNameFilter, appointmentsList]);

  // Reset filter function
  const resetFilters = () => {
    setDateFilter("");
    setPatientNameFilter("");
    setDoctorNameFilter("");
    setFilteredAppointments(appointmentsList); // Show all appointments again
  };

  return (
    <div className="admin_appointments">
      <div className="admin_header">
        <Header pagename="Appointments" />
      </div>
      <div className="appointments_filters">
        <div className="patientname_filter">
          <label htmlFor="">Patient Name :</label>
          <input
            type="text"
            placeholder="Filter by Patient Name"
            value={patientNameFilter}
            onChange={(e) => setPatientNameFilter(e.target.value)}
          />
        </div>
        <div className="doctorname_filter">
          <label htmlFor="">Doctor Name :</label>
          <input
            type="text"
            placeholder="Filter by Doctor Name"
            value={doctorNameFilter}
            onChange={(e) => setDoctorNameFilter(e.target.value)}
          />
        </div>
        <div className="date_filter">
          <label htmlFor="">Date :</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
        <button onClick={resetFilters} className="reset-filters-button">
          Reset Filters
        </button>
      </div>
      <div className="appointments_data">
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Appointment Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>
                  {appointment.patientId?.fname} {appointment.patientId?.lname}
                </td>
                <td>{appointment.doctorId?.name}</td>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.time}</td>
                <td>{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointment;
