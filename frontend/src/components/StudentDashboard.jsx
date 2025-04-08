import React from "react";
import HeaderBar from "./HeaderBar";
import InfoPanel from "./InfoPanel";
import AppointmentsPage from "./AppointmentsPage";
import Profile from "./Profile";

const StudentDashboard = () => {
  // Get email from localStorage (same as LandingPage)
  const userEmail = localStorage.getItem("emailForSignIn");

  return (
    <div className="student-dashboard" style={{ position: 'relative' }}>
      <HeaderBar />
      {userEmail && <Profile email={userEmail} />}
      
      <h2 style={{ marginTop: '20px' }}>Welcome to the Student Dashboard</h2>

      <div className="info-panel-container">
        <InfoPanel />
      </div>
      <div className="appointments">
        <AppointmentsPage />
      </div>
    </div>
  );
};

export default StudentDashboard;