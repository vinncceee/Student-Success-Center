import React, { useState, useEffect } from "react";
import "../styles/AppointmentsPage.css";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  useEffect(() => {
    // Hardcoded appointments data
    setAppointments([
        { "id": 6, "tutor": "Diana", "time": "May 5, 2025 Mon 10:00 AM - 11:30 AM" },
        { "id": 7, "tutor": "Mike", "time": "May 10, 2025 Sat 2:15 PM - 3:45 PM" },
        { "id": 8, "tutor": "Blaze", "time": "May 12, 2025 Mon 9:30 AM - 10:15 AM" },
        { "id": 9, "tutor": "Diana", "time": "May 15, 2025 Thurs 4:00 PM - 5:30 PM" },
        { "id": 10, "tutor": "Mike", "time": "May 20, 2025 Tues 1:00 PM - 2:30 PM" },
        { "id": 11, "tutor": "Blaze", "time": "May 25, 2025 Sun 3:00 PM - 4:00 PM" },
        { "id": 12, "tutor": "Diana", "time": "June 2, 2025 Mon 11:00 AM - 12:15 PM" },
        { "id": 13, "tutor": "Mike", "time": "June 8, 2025 Sun 10:45 AM - 12:00 PM" },
        { "id": 14, "tutor": "Blaze", "time": "June 15, 2025 Sun 1:30 PM - 3:00 PM" },
        { "id": 15, "tutor": "Diana", "time": "June 20, 2025 Fri 2:00 PM - 3:45 PM" },
    ]);
  }, []);

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowEditOptions(false);
    setMessage(""); // Clear previous message
  };

  const handleEditClick = () => {
    setShowEditOptions(true);
  };

  const handleKeepAppointment = () => {
    setMessage("Appointment Remains Unchanged");
    setMessageColor("#28A745"); // Green
    setShowEditOptions(false);
  
    setTimeout(() => {
      setMessage("");
    }, 3000); // Message disappears after 3 seconds
  };
  
  const handleCancelAppointment = () => {
    setAppointments(appointments.filter((appt) => appt.id !== selectedAppointment.id));
    setMessage("Appointment Cancelled Successfully");
    setMessageColor("#CD4625"); // Red
    setShowEditOptions(false);
    setSelectedAppointment(null);
  
    setTimeout(() => {
      setMessage("");
    }, 3000); // Message disappears after 3 seconds
  };

  return (
    <div className="appointments-container">
      <div className="appointments-box">
        <h2>Upcoming Appointments:</h2>
        <div className="appointments-scroll">
          <ul>
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                onClick={() => handleAppointmentClick(appointment)}
                className={selectedAppointment?.id === appointment.id ? "selected" : ""}
              >
                {appointment.tutor} - {appointment.time}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedAppointment && !showEditOptions && (
        <button className="edit-button" onClick={handleEditClick}>Edit Appointment</button>
      )}

      {showEditOptions && (
        <div className="edit-options">
          <button className="edit-button" onClick={handleCancelAppointment}>Cancel Appointment</button>
          <button className="edit-button" onClick={handleKeepAppointment}>Keep Appointment</button>
        </div>
      )}

      {message && <p className="status-message" style={{ color: messageColor }}>{message}</p>}
    </div>
  );
}

export default AppointmentsPage;
