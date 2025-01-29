const Session = require("../Models/session");

// Get available sessions for a doctor on a specific date
exports.getAvailableSessions = async (req, res) => {
  const { doctorId, date } = req.query;

  try {
    const sessions = await Session.find({ doctorId, date, isBooked: false });
    res.json({ sessions });
  } catch (error) {
    console.error("Error fetching available sessions:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Book a session
exports.bookSession = async (req, res) => {
  const { doctorId, date, time } = req.body;

  try {
    const session = await Session.findOneAndUpdate(
      { doctorId, date, time, isBooked: false },
      { isBooked: true },
      { new: true }
    );

    if (!session) {
      return res.status(400).json({ error: "Session not available" });
    }

    res.json({ session });
  } catch (error) {
    console.error("Error booking session:", error);
    res.status(500).json({ error: "Server error" });
  }
};