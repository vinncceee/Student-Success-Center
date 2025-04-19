import React from "react";
import HeaderBar from "./HeaderBar";
import AuthRequest from "./AuthRequest"
import UnassignedRoles from "./UnassignedRoles"
import ProfileSearch from "./ProfileSearch";
import AvailabilityRequests from "./AvailabilityRequests";
import Profile from "./Profile";
import Calendar from "./Calendar";
import "../styles/AdminDashboard.css"; //leftPanel is in InfoPanel

const AdminDashboard = () => {
  const userEmail = localStorage.getItem("emailForSignIn"); // Get admin's email
  return (
    <div>
      <HeaderBar />
      {userEmail && <Profile email={userEmail} />}
      <main className="leftPanel">
        <ProfileSearch />
        <AvailabilityRequests />
        {/*<Calendar />*/}
      </main>
      <main className="rightPanel">
        <AuthRequest />
        <UnassignedRoles />
      </main>
    </div>
  );
};

export default AdminDashboard;
