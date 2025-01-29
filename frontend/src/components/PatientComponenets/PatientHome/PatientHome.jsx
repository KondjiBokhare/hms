import React, { useEffect, useState } from "react";
import "./PatientHome.css";
import { FaAccessibleIcon, FaBookmark, FaCalendarPlus, FaSearch } from "react-icons/fa";
import { TbActivityHeartbeat } from "react-icons/tb";
import Header from "../../Header/Header";
import axios from "axios";

const PatientHome = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]); 

  const patient = JSON.parse(localStorage.getItem("user"));
  const patientname = patient.fname + " " + patient.lname;
  const patientId = window.localStorage.getItem("patientID");

  useEffect(() => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${patient.token}`,
        },
      };

      const fetchAppointments = async () => {
        const response = await axios.get(
          `http://localhost:8585/api/appointmentbypatient/${patientId}`,
          config
        );

        setAllAppointments(response.data);

        const currentDate = new Date();

        // Filter out appointments that are in the past
        const upcomingAppointments = response.data.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          let appointmentTime = appointment.time;

          // Ensure scheduleTime is defined before splitting
          if (appointmentTime) {
            const timeParts = appointmentTime.split(":");
            appointmentDate.setHours(timeParts[0], timeParts[1]); // set appointment time to the correct hour and minute
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
  }, [patient.token, patientId]);

  // Filter today's sessions
  const todaySessions = allAppointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return(
      appointmentDate.toDateString() === new Date().toDateString()
    )
  }).length;

  return (
    <div className="patient_home">
      <div className="patienthome_header">
        <Header pagename="Home" />
      </div>
      <div className="patienthome_welcome">
        <div className="patient_welcome">
          <h3>Welcome!</h3>
          <h1>{patientname}</h1>
          <p>
            Haven't any idea about doctors no problem lets jump to the "All
            Doctors" section or "Sessions" <br />
            Track your past and future appointments history. <br />
            Also find out the expected arrival time of your doctor or medical
            consultant.
          </p>
        </div>
      </div>
      <div className="patienthome_content">
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
            <div className="all_patients">
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
                <b>{todaySessions}</b>
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

        {/* Conditional rendering for no appointments */}
        <div className="upcoming_bookings">
          <h3>Your Upcoming Bookings</h3>
            <table>
              <thead>
                <tr>
                  <th>Appoint. No.</th>
                  <th>Session Title</th>
                  <th>Doctor</th>
                  <th>Schedule Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {allAppointments.map((appointment, index) => (
                  <tr key={appointment.id}>
                    <td>{index + 1}</td>
                    <td>{appointment.reason}</td>
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

export default PatientHome;
