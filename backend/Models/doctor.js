const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'doctor',
    },
    // Optional field for the working hours (which can be customized per doctor)
    workingHours: {
        type: Map,
        of: {
            from: String,  // start time (e.g. "09:00")
            to: String,    // end time (e.g. "17:00")
        },
        default: {
            Monday: { from: '09:00', to: '18:00' },
            Tuesday: { from: '09:00', to: '18:00' },
            Wednesday: { from: '09:00', to: '18:00' },
            Thursday: { from: '09:00', to: '18:00' },
            Friday: { from: '09:00', to: '18:00' },
            Saturday: { from: '09:00', to: '18:00' },
            Sunday: { from: '09:00', to: '18:00' }, // example where the doctor doesn't work on Sundays
        },
    },
    // Optional: appointments field (only if you want to store appointments directly on the doctor)
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
