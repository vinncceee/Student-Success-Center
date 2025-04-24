import React, { useState } from "react";
import HeaderBar from "./HeaderBar";
import InfoPanel from "./InfoPanel";
import AppointmentsPage from "./AppointmentsPage";
import TodaysAvailableSlots from "./TodaysAvailableSlots";
import Calendar from "./Calendar";
import Profile from "./Profile";
import "../styles/StudentDashboard.css";

const StudentDashboard = ({ user }) => {
  const [refreshAppointmentsFlag, setRefreshAppointmentsFlag] = useState(false);

  const triggerRefreshAppointments = () => {
    setRefreshAppointmentsFlag((prev) => !prev);
  };

  return (
    <div>
      <HeaderBar />

      <main className="student-left-panel">
        <div className="student-profile-chat-container">
          <div className="student-profile">
            <Profile email={user?.email} />
          </div>
          <div className="student-attendance">Student Attendance</div>
        </div>

        <div className="student-section-box student-available-turors">
          <TodaysAvailableSlots user={user} onBookSuccess={triggerRefreshAppointments} />
        </div>

        <div className="student-section-box student-appointments">
          <AppointmentsPage user={user} refreshTrigger={refreshAppointmentsFlag} />
        </div>

        <div className="student-section-box student-calendar">
        <Calendar user={user} />
        </div>
      </main>

      <main className="student-right-panel">
        <InfoPanel />
      </main>
    </div>
  );
};


export default StudentDashboard;
