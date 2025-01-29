import React, { useEffect, useState } from "react";
import axios from "axios";

const AvailableSession = ({ doctorId, date, onSelectTime }) => {
  const [availableSessions, setAvailableSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorId || !date) return;

    const fetchAvailableSessions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8585/api/available-sessions`,
          {
            params: { doctorId, date },
          }
        );
        setAvailableSessions(response.data.sessions); // Assuming response contains an array of available times
        setLoading(false);
      } catch (error) {
        console.error("Error fetching available sessions:", error);
        setLoading(false);
      }
    };

    fetchAvailableSessions();
  }, [doctorId, date]);

  const handleTimeSelect = (time) => {
    onSelectTime(time); // Pass the selected time to parent
  };

  if (loading) {
    return <div>Loading available sessions...</div>;
  }

  return (
    <div className="available_sessions">
      {availableSessions.length === 0 ? (
        <p>No available sessions for this doctor on this date.</p>
      ) : (
        availableSessions.map((session, index) => (
          <button
            key={index}
            type="button"
            disabled={session.isBooked}
            onClick={() => handleTimeSelect(session.time)}
          >
            {session.time}
          </button>
        ))
      )}
    </div>
  );
};

export default AvailableSession;
