import React, { useState } from "react";
import Modal from "./ui/Modal";
import "../styles/booking.css";
import BookingAvailableTutors from "./BookingAvailableTutors";
import BookingFilters from "./BookingFilters";

const BookingSessionModal = ({ isOpen, onClose }) => {
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [selectedTutorId, setSelectedTutorId] = useState(null); // NEW state

  const tutors = [
    { id: 1, name: "Blaze", date: "March 15", time: "1:00 PM - 2:00 PM", mode: "Online", subject: "CSE-3295" },
    { id: 2, name: "Sarah", date: "March 16", time: "3:00 PM - 4:00 PM", mode: "In Person", subject: "Math 101" },
    { id: 3, name: "Mike", date: "April 1", time: "2:00 PM - 3:00 PM", mode: "Online", subject: "Physics 201" },
  ];

  const handleFilterChange = (filters) => {
    const filtered = tutors.filter((tutor) =>
      (filters.subject ? tutor.subject === filters.subject : true) &&
      (filters.date ? tutor.date === filters.date : true) &&
      (filters.mode ? tutor.mode === filters.mode : true)
    );
    setFilteredTutors(filtered);
  };

  const handleTutorSelect = (id) => {
    setSelectedTutorId(id);
  };

  const handleSchedule = () => {
    const selectedTutor = tutors.find((tutor) => tutor.id === selectedTutorId);
    alert(`Scheduled session with ${selectedTutor.name}`);
    // Here you can call an API or do whatever you need
    onClose(); // close modal after scheduling
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book a Session">
      <BookingFilters onFilterChange={handleFilterChange} />
      <BookingAvailableTutors
        tutors={filteredTutors.length > 0 ? filteredTutors : tutors}
        onSelectTutor={handleTutorSelect}
        selectedTutorId={selectedTutorId}
      />
      <div className="schedule-btn-container">
      <button
      className={`schedule-btn ${selectedTutorId ? "enabled" : "disabled"}`}
      disabled={!selectedTutorId}
    onClick={handleSchedule}
  >
  Schedule
</button>

      </div>
    </Modal>
  );
};

export default BookingSessionModal;

