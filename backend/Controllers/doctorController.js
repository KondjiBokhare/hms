const doctorModel = require('../Models/doctor');    
const bcrypt = require('bcrypt');

// Create a new doctor
const createDoctor = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const doctor = new doctorModel({
            name: req.body.name,
            specialization: req.body.specialization,
            contact: req.body.contact,
            email: req.body.email,
            experience: req.body.experience,
            password: hashedPassword,
        });
        await doctor.save();
        res.status(201).send(doctor);
    } catch (error) {
        res.status(400).send(error);
    }
};

//Get doctor by id
const getDoctorById = async (req, res) => {
    try {
        const doctor = await doctorModel.findById(req.params.id);
        res.status(200).send(doctor);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Get all doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find();
        res.status(200).send(doctors);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Update a doctor
const updateDoctor = async (req, res) => {
    try {
        const doctor = await doctorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(doctor);
    }
    catch (error) {
        res.status(400).send(error);
    }
}

// Delete a doctor
const deleteDoctor = async (req, res) => {
    try {
        await doctorModel.findByIdAndDelete(req.params.id);
        res.status(200).send('Doctor deleted successfully');
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    createDoctor,
    getDoctorById,
    getAllDoctors,
    updateDoctor,
    deleteDoctor,
};
