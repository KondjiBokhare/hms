import React, { useState, useEffect } from "react";
import "./DoctorDashboard.css";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import axios from "axios";
import {
  FaAccessibleIcon,
  FaBookmark,
  FaCalendarPlus,
} from "react-icons/fa";
import { TbActivityHeartbeat } from "react-icons/tb";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]); 

  const doctor = JSON.parse(localStorage.getItem("user"));
  const doctorId = doctor?.id;
  const doctorname = doctor.name;

  useEffect(() => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${doctor.token}`,
        },
      };

      const fetchAppointments = async () => {
        const response = await axios.get(
          `http://localhost:8585/api/appointmentbydoctor/${doctorId}`,
          config
        );

        setAllAppointments(response.data);

        const currentDate = new Date();

        // Filter out appointments that are in the past
        const upcomingAppointments = response.data.filter((appointment) => {
          const appointmentDate = new Date(appointment.scheduleDate);
          let appointmentTime = appointment.scheduleTime;

          // Ensure scheduleTime is defined before splitting
          if (appointmentTime) {
            const timeParts = appointmentTime.split(":");
            appointmentDate.setHours(timeParts[0], timeParts[1]); // set appointment time to the correct hour and minute
          } else {
            return false;
          }

          return appointmentDate >= currentDate;
        });

        setAppointments(upcomingAppointments);
      };

      const fetchDoctors = async () => {
        const { data } = await axios.get(
          "http://localhost:8585/api/doctor",
          config
        );
        setDoctors(data);
      };

      const fetchPatients = async () => {
        const { data } = await axios.get(
          "http://localhost:8585/api/patients",
          config
        );
        setPatients(data);
      };

      fetchAppointments();
      fetchDoctors();
      fetchPatients();
    } catch (error) {
      console.log(error);
    }

    
  }, [doctor.token, doctorId]);
  const todaysSessions = allAppointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return (
     appointmentDate.toDateString() === new Date().toDateString()
    );
  }).length;

  const routeAppointment = () => {
    navigate("myAppointments");
  };

  return (
    <div className="doctor_home">
      <div className="doctorhome_header">
        <Header pagename="Home" />
      </div>
      <div className="doctorhome_welcome">
        <div className="doctor_welcome">
          <h3>Welcome!</h3>
          <h1>{doctorname}</h1>
          <p>
            Thanks for joining with us. We are always trying to get you a
            complete service. <br />
            You can view your daily schedule and appointments at home.
          </p>
        </div>
        <button type="submit" id="doctorSearch" onClick={routeAppointment}>
          View Appointments
        </button>
      </div>
      <div className="doctorhome_content">
        <div className="status">
          <h2>Status</h2>
          <div className="status_sections">
            <div className="All_Doctors">
              <div className="data">
                <b>{doctors.length}</b>
                <b>All Doctors</b>
              </div>
              <div className="icon">
                <FaCalendarPlus />
              </div>
            </div>
            <div className="all_doctors">
              <div className="data">
                <b>{patients.length}</b>
                <b>All Patients</b>
              </div>
              <div className="icon">
                <FaAccessibleIcon />
              </div>
            </div>
            <div className="new_bookings">
              <div className="data">
                <b>{todaysSessions}</b>
                <b>newBookings</b>
              </div>
              <div className="icon">
                <FaBookmark />
              </div>
            </div>
            <div className="total_sessions">
              <div className="data">
                <b>{todaysSessions}</b>
                <b>Todays Sessions</b>
              </div>
              <div className="icon">
                <TbActivityHeartbeat />
              </div>
            </div>
          </div>
        </div>
        <div className="upcoming_bookings">
          <h3>Your Upcoming Bookings</h3>
          <table>
            <thead>
              <tr>
                <th>Appoint. no</th>
                <th>Session Title</th>
                <th>Patient</th>
                <th>Schedule Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {allAppointments.map((appointment,index) => (
                <tr key={appointment._id}>
                  <td>{index + 1}</td>
                  <td>{appointment.reason}</td>
                  <td>{appointment.patientId?.fname} {appointment.patientId?.lname}</td>
                  <td>
                    {new Date(appointment.date).toLocaleDateString()}{appointment.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
