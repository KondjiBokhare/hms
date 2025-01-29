const express = require('express');
const router = express.Router();
const appointmentController = require('../Controllers/appointmentController');
const mongoose = require('mongoose');

// Middleware to validate ObjectId format
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  next();
};

// Routes
router.post('/appointments', appointmentController.createAppointment);
router.get('/appointments', appointmentController.getAppointments); // Optionally support query params
router.get('/appointments/:id', validateObjectId, appointmentController.getAppointmentById);
router.get('/appointmentbydoctor/:doctorId',  appointmentController.getAppointmentByDoctorId);
router.get('/appointmentbypatient/:patientId', appointmentController.getAppointmentByPatientId);
router.put('/appointments/:id', validateObjectId, appointmentController.updateAppointment);
router.put('/appointmentstatus/:id', validateObjectId, appointmentController.updateAppointmentStatus);
router.delete('/appointments/:id', validateObjectId, appointmentController.deleteAppointment);
// router.get('/available-sessions', appointmentController.getAvailableSessions);
router.get('/available-sessions', appointmentController.getAvailableTime);


module.exports = router;
