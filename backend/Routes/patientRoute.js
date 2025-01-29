const express = require('express');
const patientRouter = express.Router();
const patientController = require('../Controllers/patientController');

patientRouter.post('/patients', patientController.createPatient);
patientRouter.get('/patients', patientController.findAll);
patientRouter.get('/patients/:id', patientController.findById);
patientRouter.put('/patients/:id', patientController.updatePatient);
patientRouter.delete('/patients/:id', patientController.deletePatient);

module.exports = patientRouter;