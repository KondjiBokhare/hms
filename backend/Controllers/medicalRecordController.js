const MedicalRecord = require('../Models/medicalRecord');
const Patient = require('../Models/patient'); 
const Doctor = require('../Models/doctor'); 

// Controller to create a medical record with prescriptions
const createMedicalRecord = async (req, res) => {
  try {
    const { patient, doctor, prescriptions } = req.body;

    // Validate incoming data
    if (!patient || !doctor || !Array.isArray(prescriptions)) {
      return res.status(400).json({ message: 'Invalid input. Ensure patientId, doctorId, and prescriptions are provided.' });
    }

    // Optional: Check if patient and doctor exist in the database
    const patientt = await Patient.findById(patient);
    const doctorr = await Doctor.findById(doctor);

    if (!patientt) {
      return res.status(404).json({ message: 'Patient not found.' });
    }

    if (!doctorr) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }

    // Create the medical record with the provided data
    const newMedicalRecord = new MedicalRecord({
      patient: patientt,
      doctor: doctorr,
      prescriptions: prescriptions, // Directly embedding prescriptions in the record
    });

    // Save the new medical record to the database
    await newMedicalRecord.save();

    // Send a success response
    return res.status(201).json({
      message: 'Medical record created successfully',
      medicalRecord: newMedicalRecord,
    });

  } catch (error) {
    // Log the error for debugging
    console.error('Error creating medical record:', error);

    // Send a 500 error response with a generic message
    return res.status(500).json({
      message: 'Error creating medical record',
      error: error.message,
    });
  }
};

// Controller to get all medical records
const getMedicalRecords = async (req, res) => {
  try {
    // Fetch all medical records from the database, populating the patient and doctor references
    const medicalRecords = await MedicalRecord.find()
      .populate('patient', 'fname lname age')  // Replace with patient details as needed
      .populate('doctor', 'name specialization');  // Replace with doctor details as needed

    // Send response back to the client
    return res.status(200).json({
      message: 'Medical records fetched successfully',
      medicalRecords,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching medical records', error });
  }
};

// Controller to get medical records by Patient's ID
const getMedicalRecordsByPatientsId = async (req, res) => {
  try {
    const { patientId } = req.params;  // Use patientId from the URL params
    
    // Fetch medical records for the given patient
    const medicalRecords = await MedicalRecord.find({ patient: patientId })
      .populate('doctor', 'name specialization');  // Optionally populate doctor info
    
    if (!medicalRecords.length) {
      return res.status(404).json({ message: 'No medical records found for this patient.' });
    }

    return res.status(200).json({ message: 'Patient medical records fetched successfully', medicalRecords });

  } catch (error) {
    return res.status(500).json({ message: 'Error fetching medical records', error });
  }
}

// Controller to get medical records by Doctor's ID
const getMedicalRecordsByDoctorsId = async (req, res) => {
  try {
    const { doctorId } = req.params;  // Use doctorId from the URL params
    
    // Fetch medical records for the given doctor
    const medicalRecords = await MedicalRecord.find({ doctor: doctorId })
      .populate('patient', 'fname lname age');  // Optionally populate patient info
    
    if (!medicalRecords.length) {
      return res.status(404).json({ message: 'No medical records found for this doctor.' });
    }

    return res.status(200).json({ message: 'Doctor medical records fetched successfully', medicalRecords });

  } catch (error) {
    return res.status(500).json({ message: 'Error fetching medical records', error });
  }
}

module.exports = {
  createMedicalRecord,
  getMedicalRecords,
  getMedicalRecordsByPatientsId,
  getMedicalRecordsByDoctorsId
};
