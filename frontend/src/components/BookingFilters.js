import React, { useState } from "react";
import "../styles/booking.css";

const BookingFilters = ({ onFilterChange }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMode, setSelectedMode] = useState("");

  // List of subjects (could come from API later)
  const subjects = ["CSE-3295", "Math 101", "Physics 201"];

  // Handle filter changes
  const applyFilters = () => {
    onFilterChange({
      subject: selectedSubject,
      date: selectedDate,
      mode: selectedMode,
    });
  };

  return (
    <div className="filters-container">
      <h3 className="filters-title">Filters</h3>

      {/* Subject Filter */}
      <div className="filter-group">
        <label className="filter-label">Subject</label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="filter-select"
        >
          <option value="">All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      {/* Date Filter */}
      <div className="filter-group">
        <label className="filter-label">Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="filter-input"
        />
      </div>

      {/* Mode Filter */}
      <div className="filter-group">
        <label className="filter-label">Mode</label>
        <select
          value={selectedMode}
          onChange={(e) => setSelectedMode(e.target.value)}
          className="filter-select"
        >
          <option value="">Any Mode</option>
          <option value="Online">Online</option>
          <option value="In Person">In Person</option>
        </select>
      </div>

      {/* Apply Button */}
      <button onClick={applyFilters} className="apply-filters-btn">
        Apply Filters
      </button>
    </div>
  );
};

export default BookingFilters;
