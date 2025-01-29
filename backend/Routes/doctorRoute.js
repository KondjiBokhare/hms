const express = require('express');
const router = express.Router();
const doctorController = require('../Controllers/doctorController');

router.post('/doctor', doctorController.createDoctor);
router.get('/doctor/:id', doctorController.getDoctorById);
router.get('/doctor', doctorController.getAllDoctors);
router.put('/doctor/:id', doctorController.updateDoctor);
router.delete('/doctor/:id', doctorController.deleteDoctor);

module.exports = router;
