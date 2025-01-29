const Patient = require('../Models/patient');
const bcrypt = require('bcrypt'); 

// Controller function to create a new patient
const createPatient = async (req, res) => {
  try {
    const { fname, lname, contact, address, dob, email, password, gender, role,age } = req.body;

    // Check if all required fields are provided
    // if (!fname || !lname || !contact || !address || !dob || !email || !password || !gender || !role) {
    //   return res.status(400).send('Missing required fields');
    // }

    // Check if the user already exists (use await for async operation)
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).send('User already exists');
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new patient object
    const newPatient = new Patient({
      fname,
      lname,
      contact,
      address,
      dob,
      age,
      email,
      gender,
      password: hashedPassword
    });

    // Save the new patient to the database
    await newPatient.save();
    res.status(201).send(newPatient);
  } catch (error) {
    res.status(500).send('Error occurred while creating patient');
  }
};


// Controller function to find a patient by ID
const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).send('Patient not found');
    } else {
      res.status(200).send(patient);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send('Error occurred while finding patient');
  }
};

// Controller function to get all patients
const findAll = async (req, res) => {
  try {
    const patients = await Patient.find();

    if (!patients || patients.length === 0) {
      return res.status(404).send('No patients found');
    } else {
      res.status(200).send(patients);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send('Error occurred while fetching patients');
  }
};

// Controller function to update a patient's information
const updatePatient = async (req, res) => {
  try {
    const id = req.params.id;
    const { fname, lname, contact, address, dob,age, email, password , gender} = req.body;

    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).send('Patient not found');
    }

    // If the password is updated, hash it
    if (password) {
      patient.password = await bcrypt.hash(password, 10);
    }

    patient.fname = fname;
    patient.lname = lname;
    patient.contact = contact;
    patient.address = address;
    patient.dob = dob;
    patient.age = age;
    patient.email = email;
    patient.gender = gender;

    await patient.save();
    res.status(200).send(patient);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error occurred while updating patient');
  }
};

// Controller function to delete a patient
const deletePatient = async (req, res) => {
  try {
    const id = req.params.id;
    const patient = await Patient.findByIdAndDelete(id);

    if (!patient) {
      return res.status(404).send('Patient not found');
    } else {
      res.status(200).send('Patient deleted');
    }
  } catch (error) {
    console.error(error);
    res.status(400).send('Error occurred while deleting patient');
  }
};

module.exports = { createPatient, findById, findAll, updatePatient, deletePatient };
