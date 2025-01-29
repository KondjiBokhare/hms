import React, { useState, useEffect } from "react";
import "./All_Doctors.css";
import axios from "axios";
import Header from "../../Header/Header";
import MakeAppointment from "../MakeAppointment/MakeAppointment";


const All_Doctors = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [doctorName, setDoctorName] = useState([]);
  const [doctorId,setDoctorId] = useState()
  
  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8585/api/doctor");
        const data = response.data;
        setDoctorsList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllDoctors();
  }, []);

  const handleMakeAppointment = (id,name)=>{
    setDoctorId(id);
    setDoctorName(name);
    setIsOpen(true);
  }

  return (
    <div className="patient_doctors">
      <div className="patient_header">
        <Header pagename="All_Doctors" />
      </div>
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <MakeAppointment doctorName={doctorName} doctorId={doctorId}  onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
      <div className="doctors_data">
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Handle Doctor</th>
          </tr>
          {doctorsList.map((doctor) => (
            <tr key={doctor._id}>
              <td>{doctor.name}</td>
              <td>{doctor.email}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.experience} years</td>
              <td>
                <button type="submit"
                 onClick={
                  () => handleMakeAppointment(doctor._id,doctor.name)
                  }>
                  Make Appointment
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default All_Doctors;
