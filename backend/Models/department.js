const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true
    },
    headDoctor: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'Doctor',
        required: true
    },
    numOfBeds: {
        type: Number,
        required: true
    }
});

    const Department = mongoose.model('Department', departmentSchema);
    module.exports = Department;