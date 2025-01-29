const MedicalRecord = require('../Models/medicalRecord');

// Create a new medical record
const createMedicalRecord = async (req, res) => {
    const { patientId, doctorId, nurseId, date, symptoms, diagnosis, prescription } = req.body;

    try {
        const medicalRecord = new MedicalRecord({
            patient: patientId,
            doctor: doctorId,
            nurse: nurseId,
            date,
            symptoms,
            diagnosis,
            prescription
        });
        await medicalRecord.save();
        res.status(201).json(medicalRecord);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all medical records
const getMedicalRecords = async (req, res) => {
    try {
        const medicalRecords = await MedicalRecord.find();
        res.json(medicalRecords);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a medical record by ID
const getMedicalRecordById = async (req, res) => {
    try {
        const medicalRecord = await MedicalRecord.findById(req.params.id);
        if (!medicalRecord) {
            return res.status(404).json({ message: "Medical record not found" });
        }
        res.json(medicalRecord);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a medical record by ID
const updateMedicalRecord = async (req, res) => {
    const { patientId, doctorId, nurseId, date, symptoms, diagnosis, prescription } = req.body;

    try {
        const medicalRecord = await MedicalRecord.findById(req.params.id);
        if (!medicalRecord) {
            return res.status(404).json({ message: "Medical record not found" });
        }
        medicalRecord.patient = patientId;
        medicalRecord.doctor = doctorId;
        medicalRecord.nurse = nurseId;
        medicalRecord.date = date;
        medicalRecord.symptoms = symptoms;
        medicalRecord.diagnosis = diagnosis;
        medicalRecord.prescription = prescription;
        await medicalRecord.save();
        res.json(medicalRecord);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete a medical record by ID

const deleteMedicalRecord = async (req, res) => {
    try {
        const medicalRecord = await MedicalRecord.findById(req.params.id);
        if (!medicalRecord) {
            return res.status(404).json({ message: "Medical record not found" });
        }
        await medicalRecord.remove();
        res.json({ message: "Medical record deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createMedicalRecord,
    getMedicalRecords,
    getMedicalRecordById,
    updateMedicalRecord,
    deleteMedicalRecord
};