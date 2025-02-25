const express = require('express');
const router = express.Router();
const medicalRecordController = require('../Controllers/medicalRecordController');

// Route to create a medical record
router.post('/medicalRecords', medicalRecordController.createMedicalRecord);

// Route to get all medical records
router.get('/medicalRecords', medicalRecordController.getMedicalRecords);

// Route to get medical records by patient ID
router.get('/medicalRecords/patient/:patientId', medicalRecordController.getMedicalRecordsByPatientsId);

// Route to get medical records by doctor ID
router.get('/medicalRecords/doctor/:doctorId', medicalRecordController.getMedicalRecordsByDoctorsId);

module.exports = router;
