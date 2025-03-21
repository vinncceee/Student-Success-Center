import React from "react";
import "../styles/booking.css";

const BookingAvailableTutors = ({ tutors = [] }) => {
  return (
    <div className="available-tutors-container">
      <h3>Available Tutors</h3>
      <div className="tutors-list">
        {tutors.length > 0 ? (
          tutors.map((tutor) => (
            <label key={tutor.id} className="block">
              <input type="radio" name="tutor" value={tutor.id} />
              <div className="tutor-details">
                <div className="tutor-item">
                  <strong>Name:</strong> <span>{tutor.name}</span>
                </div>
                <div className="tutor-item">
                  <strong>Date:</strong> <span>{tutor.date}</span>
                </div>
                <div className="tutor-item">
                  <strong>Time:</strong> <span>{tutor.time}</span>
                </div>
                <div className="tutor-item">
                  <strong>Mode:</strong> <span>{tutor.mode}</span>
                </div>
                <div className="tutor-item">
                  <strong>Subject:</strong> <span>{tutor.subject}</span>
                </div>
              </div>
            </label>
          ))
        ) : (
          <p className="text-red-500 text-center font-medium">
            No tutors available with the selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingAvailableTutors;
