const Appointment = require("../Models/appointment");
const Patient = require("../Models/patient");
const Doctor = require("../Models/doctor");

// Create a new appointment
//pass
const createAppointment = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      date,
      time,
      reason,
      status = "Appointed",
    } = req.body;
    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);
    if (!patient || !doctor) {
      return res.status(400).json({ message: "Patient or doctor not found" });
    }

    // Optional: Check if the doctor is already booked for this time
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date,
      time,
    });
    if (existingAppointment) {
      return res
        .status(400)
        .json({ message: "Doctor is already booked for this time" });
    }

    const appointment = new Appointment({
      patientId,
      doctorId,
      date,
      time,
      reason,
      status,
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all appointments
//pass
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId") // Populate the patient field
      .populate("doctorId"); // Populate the doctor field

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an appointment by ID
//pass
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patientId")
      .populate("doctorId");
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all appointments by doctor ID
//pass
const getAppointmentByDoctorId = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const appointments = await Appointment.find({ doctorId })
      .populate("patientId") // Populate with patient details
      .populate("doctorId"); // Populate with doctor details

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this doctor." });
    }
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching appointments." });
  }
};

// Function to get all appointments for a specific patient
//pass
const getAppointmentByPatientId = async (req, res) => {
  const { patientId } = req.params;

  try {
    const appointments = await Appointment.find({ patientId })
      .populate("patientId")
      .populate("doctorId"); // Populate with doctor details

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this patient." });
    }
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching appointments." });
  }
};


// Update an appointment by ID
const updateAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, reason, status } = req.body;
    
    if (!doctorId || !patientId) {
      return res.status(400).json({ message: "doctorId and patientId are required" });
    }

    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);
    
    if (!patient || !doctor) {
      return res.status(400).json({ message: "Patient or doctor not found" });
    }

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if the doctor is already booked for the new time
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date,
      time,
      _id: { $ne: req.params.id }, // Exclude the current appointment
    });
    
    if (existingAppointment) {
      return res.status(400).json({ message: "Doctor is already booked for this time" });
    }

    // Update appointment fields
    appointment.patientId = patientId;
    appointment.doctorId = doctorId;
    appointment.date = date;
    appointment.time = time;
    appointment.reason = reason;
    appointment.status = status;

    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update appointment status
//pass
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["Appointed", "Ongoing", "Completed", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment status" });
  }
};


// Delete an appointment by ID
// pass
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    await Appointment.deleteOne({ _id: req.params.id });
    res.json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Backend function to fetch available sessions
// const getAvailableSessions = async (req, res) => {
//   const { doctorId, date } = req.query;

//   try {
//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }

//     const normalizedDate = new Date(date).toLocaleDateString(); // Normalize the date to avoid time issues
//     const bookedAppointments = await Appointment.find({
//       doctorId,
//       date: { $gte: new Date(normalizedDate), $lt: new Date(new Date(normalizedDate).setDate(new Date(normalizedDate).getDate() + 1)) },
//     });

//     // Get the doctor's working hours for the selected day
//     const dayOfWeek = new Date(date).toLocaleString("en-us", { weekday: "long" });
//     const workingHours = doctor.workingHours[dayOfWeek]; // e.g., { from: '09:00', to: '17:00' }
//      console.log(dayOfWeek)
//      console.log(workingHours)

//     if (!workingHours || workingHours.from === "Closed") {
//       return res.status(400).json({ message: "Doctor is not available on this day." });
//     }

//     const allTimeSlots = [
//       "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
//       "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
//       "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
//     ];

//     // Filter out time slots that are outside the doctor's working hours
//     const availableTimeSlots = allTimeSlots.filter(
//       (slot) => slot >= workingHours.from && slot <= workingHours.to
//     );

//     // Exclude already booked slots
//     const availableSlots = availableTimeSlots.filter(
//       (slot) => !bookedAppointments.some((appointment) => appointment.time === slot)
//     );

//     res.json({ sessions: availableSlots });
//   } catch (error) {
//     console.error("Error fetching available sessions:", error);
//     res.status(500).json({ message: error.message || "Error fetching available sessions." });
//   }
// };

const getAvailableTime = async (req, res) => {
  const { doctorId } = req.params;
  const { date } = req.query;

  const allSessions = await getAllAvailableSessionsForDate(doctorId, date);
  const occupiedSessions = await getOccupiedSessionsForDate(doctorId, date);

  const availableTimes = allSessions.filter(
    session => !occupiedSessions.includes(session)
  );

  res.json({
    availableTimes,
    occupiedTimes: occupiedSessions,
  });
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  getAppointmentByDoctorId,
  getAppointmentByPatientId,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  // getAvailableSessions,
  getAvailableTime

};
