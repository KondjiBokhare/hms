import React, { useState, useEffect } from "react";
import "./My_Appointment.css";
import axios from "axios";
import Header from "../../Header/Header";
import PatientsRecords from "../PatientsRecords/PatientsRecords";

const My_Appointment = () => {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterName, setFilterName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    const fetchAllAppointments = async () => {
      const doctorId = window.localStorage.getItem("doctorID");

      if (!doctorId) {
        console.error("Doctor ID not found in localStorage.");
      } else if (!doctorId || !/^[0-9a-fA-F]{24}$/.test(doctorId)) {
        console.log("Invalid doctor ID format");
        return;
      } else {
        try {
          const response = await axios.get(
            `http://localhost:8585/api/appointmentbydoctor/${doctorId}`
          );
          const data = response.data;
          setAppointmentsList(data);
          setFilteredAppointments(data);
        } catch (error) {
          console.log("Error message:", error.message);
          console.log("Error response:", error.response?.data);
        }
      }
    };
    fetchAllAppointments();
  }, []);

  const handleAppointmentStatus = async (id, status) => {
    console.log(id, status);
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

  // Function to handle sorting by date and time
  const sortAppointments = (appointments) => {
    return appointments.sort((a, b) => {
      const dateA = new Date(a.date + " " + a.time);
      const dateB = new Date(b.date + " " + b.time);
      return dateA - dateB; // Sort ascending by date and time
    });
  };

  // Function to filter appointments by date and patient name
  const filterAppointments = () => {
    let filtered = appointmentsList;

    if (filterDate) {
      filtered = filtered.filter(
        (appointment) =>
          new Date(appointment.date).toLocaleDateString() ===
          new Date(filterDate).toLocaleDateString()
      );
    }

    if (filterName) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.patientId?.fname
            .toLowerCase()
            .includes(filterName.toLowerCase()) ||
          appointment.patientId?.lname
            .toLowerCase()
            .includes(filterName.toLowerCase())
      );
    }

    setFilteredAppointments(sortAppointments(filtered));
  };

  useEffect(() => {
    filterAppointments(); // Call the filter function whenever the filter changes
  }, [filterDate, filterName, appointmentsList]);

  const resetFilters = () => {
    setFilterDate("");
    setFilterName("");
    setFilteredAppointments(appointmentsList);
  };

  return (
    <div className="doctor_appointments">
      <div className="doctor_header">
        <Header pagename="MY_Appointments" />
      </div>
      <div className="appointments_data">
        {/* Filters */}
        <div className="filters">
          <div className="date_filter">
            <label htmlFor="">Filter Date :</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              placeholder="Filter by Date"
            />
          </div>
          <div className="name_filter">
            <label htmlFor="">Filter By Name :</label>
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Filter by Patient Name"
            />
          </div>
          <button onClick={resetFilters} className="reset-filters-button">
          Reset Filters
        </button>
        </div>

        {isOpen && (
          <div className="modal-overlay" onClick={() => setIsOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <PatientsRecords
                onClose={() => setIsOpen(false)}
                patientId={patientId}
              />
            </div>
          </div>
        )}

        {/* Appointments Table */}
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Symptoms</th>
              <th>Date</th>
              <th>Time</th>
              <th>Appointment Status</th>
              <th>Handle Appointment</th>
              <th>View Patient History</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>
                  {appointment.patientId?.fname} {appointment.patientId?.lname}
                </td>
                <td>{appointment.reason}</td>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.time}</td>
                <td>{appointment.status}</td>
                <td id="handle_appointment">
                  <select
                    name="status"
                    id="status"
                    value={appointment.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      handleAppointmentStatus(appointment._id, newStatus);
                    }}
                  >
                    <option value="Appointed">
                      {new Date().toLocaleDateString() ===
                      new Date(appointment.date).toLocaleDateString()
                        ? "Ongoing"
                        : "Appointed"}
                    </option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Not Attempted">Not Attempted</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setPatientId(appointment.patientId._id); // Set the patient ID for the modal
                      setIsOpen(true);
                    }}
                  >
                    View History
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

export default My_Appointment;
