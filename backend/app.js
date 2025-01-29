const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
  
app.use(bodyParser.json());

//patient routes

const patientRoutes = require('./Routes/patientRoute');
app.use('/api',patientRoutes);

//doctor routes

const doctorRoutes = require('./Routes/doctorRoute');
app.use('/api',doctorRoutes);

//admin routes

const adminRoutes = require('./Routes/adminRoute');
app.use('/api',adminRoutes);

//login routes

const loginRoutes = require('./Routes/loginRoute');
app.use('/api',loginRoutes);

//appointment routes

const appointmentRoutes = require('./Routes/appointmentRoute');
app.use('/api',appointmentRoutes);

//medical record routes

const medicalRecordRoutes = require('./Routes/medicalRecordRoute');
app.use('/api',medicalRecordRoutes);



module.exports = app;