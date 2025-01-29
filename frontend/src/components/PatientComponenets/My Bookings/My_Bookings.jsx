import React, { useState, useEffect } from "react";
import "./My_Bookings.css";
import axios from "axios";
import Header from "../../Header/Header";

const My_Bookings = () => {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]);
  const [doctorFilter, setDoctorFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchAllAppointments = async () => {
      const patientId = window.localStorage.getItem("patientID");

      if (!patientId) {
        console.error("patient ID not found in localStorage.");
      } else if (!patientId || !/^[0-9a-fA-F]{24}$/.test(patientId)) {
        console.log("Invalid patient ID format");
        return;
      } else {
        try {
          const response = await axios.get(
            `http://localhost:8585/api/appointmentbypatient/${patientId}`
          );
          const data = response.data;

          // Sort appointments and push canceled appointments to the bottom
          const sortedAppointments = data.sort((a, b) => {
            if (a.status === "Cancelled" && b.status !== "Cancelled") {
              return 1;
            }
            if (a.status !== "Cancelled" && b.status === "Cancelled") {
              return -1;
            }
            return 0; 
          });

          setAppointmentsList(sortedAppointments);
          setFilteredAppointments(sortedAppointments);

          // Get the list of doctors for filtering
          const doctors = [...new Set(data.map((appointment) => appointment.doctorId?.name))];
          setDoctorsList(doctors);

        } catch (error) {
          console.log("Error message:", error.message);
          console.log("Error response:", error.response?.data);
        }
      }
    };
    fetchAllAppointments();
  }, []);

  const handleAppointmentStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:8585/api/appointmentstatus/${id}`, {
        status,
      });
      setAppointmentsList((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status } : appointment
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Filter the appointments based on the selected filters
  const filterAppointments = () => {
    let filtered = appointmentsList;

    if (doctorFilter) {
      filtered = filtered.filter((appointment) =>
        appointment.doctorId?.name.toLowerCase().includes(doctorFilter.toLowerCase())
      );
    }

    if (dateFilter) {
      filtered = filtered.filter((appointment) =>
        new Date(appointment.date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString()
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((appointment) =>
        appointment.status.toLowerCase().includes(statusFilter.toLowerCase())
      );
    }

    setFilteredAppointments(filtered);
  };

  useEffect(() => {
    filterAppointments();
  }, [doctorFilter, dateFilter, statusFilter]);

  // Reset filters to their initial state
  const resetFilters = () => {
    setDoctorFilter("");
    setDateFilter("");
    setStatusFilter("");
  };

  return (
    <div className="patient_appointments">
      <div className="patient_header">
        <Header pagename="My_Bookings" />
      </div>

      {/* Filters Section */}
      <div className="filters">
        <label>Doctor:</label>
        <select onChange={(e) => setDoctorFilter(e.target.value)} value={doctorFilter}>
          <option value="">All Doctors</option>
          {doctorsList.map((doctor, index) => (
            <option key={index} value={doctor}>
              {doctor}
            </option>
          ))}
        </select>

        <label>Date:</label>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <label>Status:</label>
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="">All Statuses</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Appointed">Appointed</option>
          <option value="Completed">Completed</option>
        </select>

        <button onClick={resetFilters}>Reset Filters</button>
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
              <th>Handle Appointment</th>
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
                <td>
                  {/* Disable the Cancel button if the appointment is canceled */}
                  <button
                    type="submit"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to cancel the appointment?")) {
                        handleAppointmentStatus(appointment._id, "Cancelled");
                      }
                    }}
                    disabled={appointment.status === "Cancelled"}
                  >
                    Cancel Appointment
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

export default My_Bookings;
