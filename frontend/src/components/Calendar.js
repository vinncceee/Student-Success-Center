import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Calendar.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Calendar = ({ user }) => {
  const [events, setEvents] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.id) return;

      try {
        const res = await axios.get(`${API_URL}/api/students/${user.id}/bookings`);
        const groupedEvents = {};

        res.data.forEach((booking) => {
          const dateStr = new Date(booking.date).toISOString().split("T")[0];
          const label = `${booking.subjects?.join(", ") || "Session"} (${booking.startTime})`;

          if (!groupedEvents[dateStr]) {
            groupedEvents[dateStr] = [];
          }
          groupedEvents[dateStr].push(label);
        });

        setEvents(groupedEvents);
      } catch (err) {
        console.error("Failed to load appointments:", err);
      }
    };

    fetchAppointments();
    const interval = setInterval(fetchAppointments, 1000); // Re-fetch every 2 seconds
    return () => clearInterval(interval); // Cleanup on unmount

  }, [user]);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = firstDay + daysInMonth;
  const rows = Math.ceil(totalCells / 7);

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < rows * 7; i++) {
      const dayNum = i - firstDay + 1;
      if (i < firstDay || dayNum > daysInMonth) {
        days.push(<div key={i} className="calendar-day empty"></div>);
      } else {
        const dateObj = new Date(year, month, dayNum);
        const dateStr = dateObj.toISOString().split("T")[0];
        const isToday = new Date().toDateString() === dateObj.toDateString();

        days.push(
          <div
            key={i}
            className={`calendar-day ${isToday ? 'today' : ''}`}
            data-date={dateStr}
          >
            <span>{dayNum}</span>
            <div className="events-container">
  {(events[dateStr] || []).map((e, idx) => (
    <div key={idx} className="event">{e}</div>
  ))}
</div>
          </div>
        );
      }
    }
    return days;
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => setCurrentDate(new Date(year, month - 1))}>&lt;</button>
          <span>{currentDate.toLocaleString('default', { month: 'long' })} {year}</span>
          <button onClick={() => setCurrentDate(new Date(year, month + 1))}>&gt;</button>
        </div>
        <div className="calendar-day-names">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="calendar-day-name">{d}</div>
          ))}
        </div>
        <div className="calendar-days">
          {renderDays()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
