import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Loader from "./components/Loader/Loader";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import Not_found from "./components/Not_found/Not_found";

// Patient routes
import Patient from "./pages/Patient/Patient";
import PatientHome from "./components/PatientComponenets/PatientHome/PatientHome";
import All_Doctors from "./components/PatientComponenets/All Doctors/All_Doctors";
import My_Bookings from "./components/PatientComponenets/My Bookings/My_Bookings";
import Scheduled_Session from "./components/PatientComponenets/Scheduled Sessions/Scheduled_Session";
import Settings from "./components/PatientComponenets/Settings/Settings";

// Doctor routes
import Doctor from "./pages/Doctor/Doctor";
import DoctorDashboard from "./components/DoctorComponents/DoctorDashboard/DoctorDashboard";
import My_Appointment from "./components/DoctorComponents/My Appointments/My_Appointment";
import My_Sessions from "./components/DoctorComponents/My Sessions/My_Sessions";
import My_Patients from "./components/DoctorComponents/My Patients/My_Patients";

// Admin routes
import Admin from "./pages/Administrator/Admin";
import AdminDashboard from "./components/AdminComponents/AdminDashboard/AdminDashboard";
import Appointment from "./components/AdminComponents/Appointment/Appointment";
import Doctors from "./components/AdminComponents/Doctors/Doctors";
import Patients from "./components/AdminComponents/Patients/Patients";
import Schedule from "./components/AdminComponents/Schedule/Schedule";
import UpdateUserProfile from "./components/PatientComponenets/UpdateUserProfile/UpdateUserProfile";


const Home = lazy(() => import("./pages/Home/Home"));

const App = () => {
  const navigate = useNavigate('');
  const role = localStorage.getItem("role");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
 useEffect ( () =>{
  if (isLoggedIn === "true") {
    if (role === "patient") {
      navigate('/patient')
    }else if(role === "doctor"){
      navigate('/doctor')
    }else if (role === "admin") {
      navigate('/admin')
    }else{
      navigate('/*')
    }
  }else{
    navigate('/')
  }
 },[])

  return (
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />

          {/* Patient Routes */}
          <Route path="/patient" element={<Patient />}>
            <Route index element={<PatientHome />} />
            <Route path="allDoctors" element={<All_Doctors />} />
            <Route path="myBookings" element={<My_Bookings />} />
            <Route path="scheduledSessions" element={<Scheduled_Session />} />
            <Route path="settings" element={<Settings />} />
            
          </Route>

          {/* Doctor Routes */}
          <Route path="/doctor" element={<Doctor />}>
            <Route index element={<DoctorDashboard />} />
            <Route path="myAppointments" element={<My_Appointment />} />
            <Route path="mySessions" element={<My_Sessions />} />
            <Route path="myPatients" element={<My_Patients />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="appointments" element={<Appointment />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="patients" element={<Patients />} />
            <Route path="schedule" element={<Schedule />} />
          </Route>

          {/* Common Components */}
          <Route path="/*" element={<Not_found />} />
          <Route path="/updateUserProfile" element={<UpdateUserProfile />} />
          
        </Routes>
      </Suspense>
  );
};

export default App;
