// student-dashboard.jsx
import React from "react";
import HeaderBar from "./HeaderBar";
import InfoPanel from "./InfoPanel";
import AppointmentsPage from "./AppointmentsPage";
import Calendar from "./Calendar";
import Profile from "./Profile";

const StudentDashboard = () => {
  const userEmail = localStorage.getItem("emailForSignIn");
  return (
    <div>
      <HeaderBar />
      {userEmail && <Profile email={userEmail} />} {/* PROFILE ADDITION */}
      <h2>Welcome to the Student Dashboard</h2>
      {/* Wrapper for InfoPanel to ensure proper alignment */}
      <div className="info-panel-container">
        <InfoPanel />
      </div>
      <div className="appointments">
      <AppointmentsPage />
      </div>
      <div className="calendar-container">
      <Calendar />
      </div>
    </div>
  );
};


export default StudentDashboard;

