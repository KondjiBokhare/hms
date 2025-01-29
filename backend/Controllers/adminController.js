const Admin = require("../Models/admin");
const bcrypt = require("bcrypt");

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword, 
    });

    await newAdmin.save();
    res.status(201).send(newAdmin);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error occurred while creating admin");
  }
};

//get admin by id
const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res.status(200).send(admin);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error occurred while getting admin");
  }
};



module.exports = { createAdmin , getAdminById};


