import React, { useState, useEffect } from "react";
import "./Doctors.css";
import axios from "axios";
import Header from "../../Header/Header";
import AddDoctor from "../AddDoctor/AddDoctor";

const Doctors = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [doctorsList, setDoctorsList] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8585/api/doctor");
        const data = response.data;
        setDoctorsList(data);
        setFilteredDoctors(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllDoctors();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filteredData = doctorsList;

      if (nameFilter) {
        filteredData = filteredData.filter((doctor) =>
          doctor.name.toLowerCase().includes(nameFilter.toLowerCase())
        );
      }

      if (specializationFilter) {
        filteredData = filteredData.filter((doctor) =>
          doctor.specialization
            .toLowerCase()
            .includes(specializationFilter.toLowerCase())
        );
      }

      setFilteredDoctors(filteredData);
    };

    applyFilters();
  }, [nameFilter, specializationFilter, doctorsList]);

  const deleteDoctor = async (id) => {
    console.log(id);
    console.log("doctor deleted");
    try {
      await axios.delete(`http://localhost:8585/api/doctor/${id}`);
      setDoctorsList(doctorsList.filter((doctor) => doctor._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const resetFilters = () => {
    setNameFilter("");
    setSpecializationFilter("");
    setFilteredDoctors(doctorsList); // Reset to show all doctors
  };

  return (
    <div className="admin_doctors">
      <div className="admin_header">
        <Header pagename="Doctors" />
      </div>

      {/* Add Doctor Modal */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AddDoctor onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}

      {/* Filters and Add Doctor Button */}
      <div className="doctors_filters">
        <div className="filter">
          <label htmlFor="nameFilter">Doctor Name:</label>
          <input
            type="text"
            id="nameFilter"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="Filter by name"
          />
        </div>

        <div className="filter">
          <label htmlFor="specializationFilter">Specialization:</label>
          <input
            type="text"
            id="specializationFilter"
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            placeholder="Filter by specialization"
          />
        </div>

        <button onClick={resetFilters} className="reset-filters-button">
          Reset Filters
        </button>

        <button onClick={() => setIsOpen(true)} className="add-doctor-button">
          Add Doctor
        </button>
      </div>

      <div className="doctors_data">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Handle Doctor</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor) => (
              <tr key={doctor._id}>
                <td>{doctor.name}</td>
                <td>{doctor.contact}</td>
                <td>{doctor.email}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.experience} years</td>
                <td>
                  <button
                    type="submit"
                    onClick={() => deleteDoctor(doctor._id)}
                  >
                    Remove Doctor
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

export default Doctors;
