const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./Config/Config.env" });
const Patient = require("../Models/patient");
const Doctor = require("../Models/doctor");
const Admin = require("../Models/admin");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email);

    // Check for a user in all three models
    const patient = await Patient.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    const admin = await Admin.findOne({ email });

    // If no user was found, return an invalid credentials message
    if (!patient && !doctor && !admin) {
      console.log(email, "not found in any model");
      return res.status(400).send("Invalid credentials");
    }

    // If a patient is found, compare the password with the stored hashed password
    if (patient) {
      const isMatch = await bcrypt.compare(password, patient.password);
      if (isMatch) {
        const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.status(200).json({
          token,
          role: patient.role,
          user: {
            id: patient._id,
            email: patient.email,
            fname: patient.fname,
            lname: patient.lname,
          },
        });
      }
    }

    // If a doctor is found, compare the password with the stored hashed password
    if (doctor) {
      const isMatchDoctor = await bcrypt.compare(password, doctor.password);
      if (isMatchDoctor) {
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.status(200).json({
          token,
          role: doctor.role,
          user: {
            id: doctor._id,
            email: doctor.email,
            name: doctor.name,    
            specialization: doctor.specialization,
            contact: doctor.contact,
            experience: doctor.experience
          },
        });
      }
    }

    // If an admin is found, compare the password with the stored hashed password
    if (admin) {
      const isMatchAdmin = await bcrypt.compare(password, admin.password);
      if (isMatchAdmin) {
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.status(200).json({
          token,
          role: admin.role,
          user: {
            id: admin._id,
            email: admin.email,
            name: admin.name,            
          },
        });
      }
    }

    // If no password match is found for any model
    return res.status(400).send("Invalid credentials");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error occurred during login");
  }
};

const Registration = async(req,res)=>{
  try{
  const { fname, lname, contact, address, dob, email, password, gender, role ,age} = req.body;
  const existingPatient = await Patient.findOne({ email });
  if (existingPatient) {
    return res.status(400).send('User already exists');
  }

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
  const token = jwt.sign({ id: newPatient._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.status(200).json({
    token,
    role: newPatient.role,
    user: {
      id: newPatient._id,
      age : newPatient.age,
      email: newPatient.email,
      fname: newPatient.fname,
      lname: newPatient.lname,
    },
  });
} catch (error) {
  res.status(500).send('Error occurred while creating patient');
}
}

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const token = req.headers['authorization']?.split(' ')[1]; // Get the token from the Authorization header

    if (!token) {
      return res.status(401).send('No token provided');
    }

    // Verify the token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Check the role of the user (Patient, Doctor, Admin)
    const patient = await Patient.findById(userId);
    const doctor = await Doctor.findById(userId);
    const admin = await Admin.findById(userId);

    let user;
    if (patient) user = patient;
    else if (doctor) user = doctor;
    else if (admin) user = admin;

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Compare the current password with the stored password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send('Current password is incorrect');
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).send('Password changed successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred during password change');
  }
};


module.exports = { login , Registration, changePassword};
