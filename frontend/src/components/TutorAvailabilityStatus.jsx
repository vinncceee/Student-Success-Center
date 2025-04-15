// TutorAvailabilityStatus.jsx
import React from 'react';
import '../styles/TutorAvailabilityStatus.css'

export default function TutorAvailabilityStatus({ status, availability }) {
  if (!availability) return null;

  return (
    <div className="status-box">
      {status === 'pending' ? (
        <h3>⏳ Availability Pending Approval</h3>
      ) : (
        <h3>✅ Availability Approved</h3>
      )}

      {availability.weeklySchedule.map(dayItem => (
        <div key={dayItem.day}>
          <h4>{dayItem.day}</h4>
          {dayItem.blocks.map((block, i) => (
            <p key={i}>
              {block.startTime} - {block.endTime} — {block.subjects.join(', ')}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}