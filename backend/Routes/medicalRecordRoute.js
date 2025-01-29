const express = require('express');
const router = express.Router();
const medicalRecordController = require('../Controllers/medicalRecordController');

router.post('/medicalrecord', medicalRecordController.createMedicalRecord);
router.get('/medicalrecords', medicalRecordController.getMedicalRecords);
router.get('/medicalrecord/:id', medicalRecordController.getMedicalRecordById);
router.put('/medicalrecord/:id', medicalRecordController.updateMedicalRecord);
router.delete('/medicalrecord/:id', medicalRecordController.deleteMedicalRecord);

module.exports = router;