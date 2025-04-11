// student-dashboard.jsx
import React from "react";
import HeaderBar from "./HeaderBar";
import InfoPanel from "./InfoPanel";
import AppointmentsPage from "./AppointmentsPage";

const StudentDashboard = () => {
  return (
    <div>
      <HeaderBar />
      <h2>Welcome to the Student Dashboard</h2>

      {/* Wrapper for InfoPanel to ensure proper alignment */}
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
