const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    prescriptions: [{
        tabletName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        dosage: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,  // E.g., 'After breakfast', 'Before bed', etc.
        },
      }],
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
module.exports = MedicalRecord;