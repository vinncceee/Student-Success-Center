import React from "react";
import HeaderBar from "./HeaderBar";
import Profile from "./Profile"; // Import the Profile component

function TutorDashboard() {
  const userEmail = localStorage.getItem("emailForSignIn"); // Get tutor's email

  return (
    <div className="tutor-dashboard">
      {/* Add Profile component at top-left */}
      <Profile email={userEmail} />
      
      <HeaderBar />
      <div className="tutor-content">
        <h1>Welcome, Tutor!</h1>
        <p>This is the Tutor Dashboard.</p>
      </div>
    </div>
  );
}

export default TutorDashboard;