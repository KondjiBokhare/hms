import React, { useState, useEffect } from 'react';
import './AdminDashboard.css'; 
import Header from '../../Header/Header';
import axios from 'axios';
import { FaAccessibleIcon, FaBookmark, FaCalendarPlus, FaSearch } from 'react-icons/fa';
import { TbActivityHeartbeat } from 'react-icons/tb';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);

  const admin = JSON.parse(localStorage.getItem('user'));
  const adminname = admin.name;

  useEffect(() => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}`,
        },
      };

      const fetchAppointments = async () => {
        const response = await axios.get('http://localhost:8585/api/appointments', config);
        setAllAppointments(response.data);

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);  // Set to midnight to compare only dates without time

        // Filter only upcoming appointments, including today's appointments
        const upcomingAppointments = response.data.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          let appointmentTime = appointment.time;

          // Set the time for the appointment to correctly compare it with the current date and time
          if (appointmentTime) {
            const timeParts = appointmentTime.split(":");
            appointmentDate.setHours(timeParts[0], timeParts[1]);
          }

          // Consider both today and future appointments
          return appointmentDate >= currentDate;
        });

        setAppointments(upcomingAppointments);
      };

      const fetchDoctors = async () => {
        const { data } = await axios.get('http://localhost:8585/api/doctor', config);
        setDoctors(data);
      };

      const fetchPatients = async () => {
        const { data } = await axios.get('http://localhost:8585/api/patients', config);
        setPatients(data);
      };

      fetchAppointments();
      fetchDoctors();
      fetchPatients();
    } catch (error) {
      console.log(error);
    }
  }, [admin.token]); // Re-fetch data whenever the token changes

  // Sort appointments by date in ascending order
  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB; // Ascending order
  });

  // Count new bookings and today's sessions (just for display)
  const newBookings = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate > new Date();
  }).length;

  const todaySessions = allAppointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return (
      appointmentDate.toLocaleDateString() === new Date().toLocaleDateString()
    );
  }).length;

  return (
    <div className="admin_home">
      <div className="adminhome_header">
        <Header pagename="Home" />
      </div>
      <div className="adminhome_welcome">
        <div className="admin_welcome">
          <h3>Welcome Admin!</h3>
          <h1>{adminname}</h1>
          <p>
            <em>You have successfully logged in to the admin dashboard.</em><br /> Here you can 
            manage all the <b>doctors</b>, <b>patients</b> and <b>sessions</b>.<br /> You can also
            view the total number of <b>doctors</b>, <b>patients</b> and <b>sessions</b>.<br />
            You can also view the total number of <b>new bookings</b> and <b>today's sessions</b>.
          </p>
        </div>
      </div>
      <div className="adminhome_content">
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
            <div className="all_admins">
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
                <b>{newBookings}</b>
                <b>New Bookings</b>
              </div>
              <div className="icon">
                <FaBookmark />
              </div>
            </div>
            <div className="total_sessions">
              <div className="data">
                <b>{todaySessions}</b>
                <b>Today's Sessions</b>
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
                <th>Appoint. no.</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Schedule Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {sortedAppointments.map((appointment, index) => (
                <tr key={appointment._id}>
                  <td>{index + 1}</td>
                  <td>
                    {appointment.patientId?.fname} {appointment.patientId?.lname}
                  </td>
                  <td>{appointment.doctorId?.name}</td>
                  <td>
                    {new Date(appointment.date).toLocaleDateString()} {appointment.time}
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

export default AdminDashboard;
