
import React, { useEffect, useRef, useState } from 'react';
import "../styles/Calendar.css";

const Calendar = () => {
  const containerRef = useRef(null);
  const [events, setEvents] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderCalendar = () => {
    const container = containerRef.current;
    if (!container) return;

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const totalCells = firstDay + daysInMonth;
    const rows = Math.ceil(totalCells / 7);

    let html = `<div class="calendar">
    <div class="calendar-header">
      <button id="prev">&lt;</button>
      <span>${currentDate.toLocaleString('default', { month: 'long' })} ${year}</span>
      <button id="next">&gt;</button>
    </div>
    <div class="calendar-day-names">
      ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        .map(d => `<div class="calendar-day-name">${d}</div>`).join('')}
    </div>
    <div class="calendar-days">`;

    for (let i = 0; i < rows * 7; i++) 
    {
      const dayNum = i - firstDay + 1;
      if (i < firstDay || dayNum > daysInMonth)
      {
        html += '<div class="calendar-day empty"></div>';
      } 
      else
      {
        const dateStr = `${year}-${month + 1}-${dayNum}`;
        const isToday = new Date().toDateString() === new Date(year, month, dayNum).toDateString();
        html += `<div class="calendar-day ${isToday ? 'today' : ''}" data-date="${dateStr}">
                <span>${dayNum}</span>
                <div class="events-container">
                  ${(events[dateStr] || []).map(e => `<div class="event">${e}</div>`).join('')}
                </div>
              </div>`;
      }
    }

    html += '</div></div>';
    container.innerHTML = html;

    container.querySelector('#prev').onclick = () => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
    };

    container.querySelector('#next').onclick = () => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
    };

    container.querySelectorAll('.calendar-day').forEach(day => {
      day.onclick = () => {
        const date = day.getAttribute('data-date');
        if (!date) return;
        const event = prompt('Enter event (leave blank to delete all):');
        setEvents(prevEvents => {
          const updated = { ...prevEvents };
          if (event)
          {
            if (!updated[date]) updated[date] = [];
            updated[date].push(event);
          }
          else
          {
            delete updated[date];
          }
          return updated;
        });
      };
    });
  };

  useEffect(() => {
    renderCalendar();
  }, [events, currentDate]);

  return <div ref={containerRef}></div>;
};

export default Calendar;